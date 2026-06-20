import 'dotenv/config'
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
      produtoId,
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

export default app