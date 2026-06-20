import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { prisma } from './db.js'

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL ?? '*' }))
app.use(express.json())

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

app.get('/api/produtos', async (req: Request, res: Response) => {
  const produtos = await prisma.produto.findMany({
    include: { categoria: true, movimentacoes: true },
  })
  res.json(produtos)
})

app.post('/api/produtos', async (req: Request, res: Response) => {
  const { nome, unidadesPorPack, qtdAtual, qtdMinima, qtdMaxima, custoDeCompra, precoDeVenda, categoria } = req.body

  const categoriaExistente = await prisma.categoria.findFirst({ where: { nome: categoria } })
  const categoriaId = categoriaExistente
    ? categoriaExistente.id
    : (await prisma.categoria.create({ data: { nome: categoria } })).id

  const produto = await prisma.produto.create({
    data: {
      nome,
      unidadesPorPack,
      qtdAtual,
      qtdMinima,
      qtdMaxima,
      custoDeCompra,
      precoDeVenda,
      categoriaId,
    },
  })
  res.status(201).json(produto)
})

app.put('/api/produtos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const {
    nome,
    unidadesPorPack,
    qtdAtual,
    qtdMinima,
    qtdMaxima,
    custoDeCompra,
    precoDeVenda,
    categoria,
  } = req.body

  let categoriaId
  if (categoria) {
    const categoriaExistente = await prisma.categoria.findFirst({ where: { nome: categoria } })
    categoriaId = categoriaExistente
      ? categoriaExistente.id
      : (await prisma.categoria.create({ data: { nome: categoria } })).id
  }

  const produto = await prisma.produto.update({
    where: { id },
    data: {
      ...(nome !== undefined && { nome }),
      ...(unidadesPorPack !== undefined && { unidadesPorPack }),
      ...(qtdAtual !== undefined && { qtdAtual }),
      ...(qtdMinima !== undefined && { qtdMinima }),
      ...(qtdMaxima !== undefined && { qtdMaxima }),
      ...(custoDeCompra !== undefined && { custoDeCompra }),
      ...(precoDeVenda !== undefined && { precoDeVenda }),
      ...(categoriaId !== undefined && { categoriaId }),
    },
  })

  res.json(produto)
})

app.delete('/api/produtos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  await prisma.produto.delete({ where: { id } })
  res.status(204).send()
})

app.get('/api/movimentacoes', async (req: Request, res: Response) => {
  const movimentacoes = await prisma.movimentacao.findMany({
    include: { produto: true },
    orderBy: { dataMovimentacao: 'desc' },
  })
  res.json(movimentacoes)
})

app.post('/api/movimentacoes', async (req: Request, res: Response) => {
  const { produtoId, quantidade, precoVendaUnitario, tipo, lucroEstimado, destinoCliente, conferenteResponsavel } = req.body
  const movimentacao = await prisma.movimentacao.create({
    data: {
      produto: { connect: { id: produtoId } },
      quantidade,
      precoVendaUnitario,
      tipo,
      lucroEstimado,
      destinoCliente,
      conferenteResponsavel,
    },
  })

  if (tipo === 'entrada') {
    await prisma.produto.update({
      where: { id: produtoId },
      data: { qtdAtual: { increment: quantidade } },
    })
  } else if (tipo === 'saida') {
    await prisma.produto.update({
      where: { id: produtoId },
      data: { qtdAtual: { decrement: quantidade } },
    })
  }

  res.status(201).json(movimentacao)
})

app.delete('/api/movimentacoes/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  
  // Busca a movimentação antes de deletar
  const movimentacao = await prisma.movimentacao.findUnique({
    where: { id },
  })

  if (!movimentacao) {
    res.status(404).json({ error: 'Movimentação não encontrada' })
    return
  }

  // Deleta a movimentação
  await prisma.movimentacao.delete({
    where: { id },
  })

  // Reverte o efeito da movimentação na quantidade do produto
  if (movimentacao.tipo === 'entrada') {
    // Se era entrada, decrementa a quantidade
    await prisma.produto.update({
      where: { id: movimentacao.produtoId },
      data: { qtdAtual: { decrement: movimentacao.quantidade } },
    })
  } else if (movimentacao.tipo === 'saida') {
    // Se era saída, incrementa a quantidade
    await prisma.produto.update({
      where: { id: movimentacao.produtoId },
      data: { qtdAtual: { increment: movimentacao.quantidade } },
    })
  }

  res.status(204).send()
})

// === ROTAS DE AUTENTICAÇÃO ===

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { nome, senha } = req.body

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { nome },
    })

    if (!usuario) {
      res.status(401).json({ error: 'Nome de usuário ou senha inválidos' })
      return
    }

    if (usuario.senha !== senha) {
      res.status(401).json({ error: 'Nome de usuário ou senha inválidos' })
      return
    }

    // Retorna os dados do usuário (exceto a senha)
    const { senha: _, ...userData } = usuario
    res.json({ user: userData })
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { nome, email, senha, cargo, foto } = req.body

  try {
    const usuarioExistente = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email },
          { nome },
        ],
      },
    })

    if (usuarioExistente) {
      res.status(400).json({ error: 'Nome de usuário ou e-mail já está em uso' })
      return
    }

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        cargo,
        foto,
      },
    })

    const { senha: _, ...userData } = usuario
    res.status(201).json({ user: userData })
  } catch (error) {
    console.error('Erro no registro:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

app.put('/api/auth/profile', async (req: Request, res: Response) => {
  const { id, nome, email, cargo, foto } = req.body

  if (!id) {
    res.status(400).json({ error: 'ID do usuário é obrigatório' })
    return
  }

  try {
    const usuarioExistenteComMesmoNome = await prisma.usuario.findFirst({
      where: {
        nome,
        NOT: { id },
      },
    })

    if (usuarioExistenteComMesmoNome) {
      res.status(400).json({ error: 'Nome de usuário já está em uso' })
      return
    }

    const usuarioExistenteComMesmoEmail = await prisma.usuario.findFirst({
      where: {
        email,
        NOT: { id },
      },
    })

    if (usuarioExistenteComMesmoEmail) {
      res.status(400).json({ error: 'E-mail já está em uso' })
      return
    }

    const usuario = await prisma.usuario.update({
      where: { id },
      data: {
        nome,
        email,
        cargo,
        foto,
      },
    })

    const { senha: _, ...userData } = usuario
    res.json({ user: userData })
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
})

// ========== ENDPOINTS DE CATEGORIAS ==========
app.get('/api/categorias', async (req: Request, res: Response) => {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nome: 'asc' },
    })
    res.json(categorias)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    res.status(500).json({ error: 'Erro ao buscar categorias' })
  }
})

app.post('/api/categorias', async (req: Request, res: Response) => {
  const { nome } = req.body

  if (!nome || !nome.trim()) {
    res.status(400).json({ error: 'Nome da categoria é obrigatório' })
    return
  }

  try {
    const categoriaExistente = await prisma.categoria.findFirst({
      where: { nome: nome.trim() },
    })

    if (categoriaExistente) {
      res.status(400).json({ error: 'Esta categoria já existe' })
      return
    }

    const categoria = await prisma.categoria.create({
      data: { nome: nome.trim() },
    })

    res.status(201).json(categoria)
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    res.status(500).json({ error: 'Erro ao criar categoria' })
  }
})

app.delete('/api/categorias/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' })
    return
  }

  try {
    // Verifica se a categoria tem produtos associados
    const produtosAssociados = await prisma.produto.count({
      where: { categoriaId: id },
    })

    if (produtosAssociados > 0) {
      res.status(400).json({ 
        error: `Não é possível deletar esta categoria. Existem ${produtosAssociados} produto(s) associado(s).` 
      })
      return
    }

    await prisma.categoria.delete({
      where: { id },
    })

    res.status(204).send()
  } catch (error) {
    console.error('Erro ao deletar categoria:', error)
    res.status(500).json({ error: 'Erro ao deletar categoria' })
  }
})

export default app
