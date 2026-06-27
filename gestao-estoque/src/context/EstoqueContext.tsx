import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface Produto {
  id: string
  nome: string
  categoria: string
  quantidade: number
  estoqueMinimo: number
  estoqueMaximo: number
  precoCusto: number
  precoVenda: number
  unidadePack: number
  dataCriacao: string
}

export interface Movimentacao {
  id: string
  horario: string
  data: string
  tipo: 'entrada' | 'saida'
  operacao: string
  quantidade: number
  conferente: string
  volume: string
  valorTotal: number
  custoUnitario: number
  margemUnitaria: number
  lucro: number
  produtoNome: string
  lote: string
}

interface ProvedorProps {
  children: ReactNode
}

interface EstoqueContextTipo {
  produtos: Produto[]
  movimentacoes: Movimentacao[]
  adicionarProduto: (produtoNovo: Omit<Produto, 'id' | 'dataCriacao'>) => Promise<void>
  editarProduto: (id: string, produtoAtualizado: Omit<Produto, 'id' | 'dataCriacao'>) => Promise<void>
  excluirProduto: (id: string) => Promise<void>
  registrarEntrada: (produtoId: string, quantidade: number, custoUnidade: number, conferente: string) => Promise<boolean>
  registrarSaida: (produtoId: string, quantidade: number, precoVenda: number, motivo?: string) => Promise<boolean>
  adicionarLucroManual: (valor: number, motivo: string, formaPagamento?: 'especie'|'pix', _taxaAplicada?: boolean) => void
  alterarQuantidadeRapida: (produtoId: string, diferenca: number) => Promise<void>
  excluirMovimentacao: (id: string) => Promise<boolean>
}

const EstoqueContext = createContext<EstoqueContextTipo | undefined>(undefined)

interface BackendCategoria {
  id: number
  nome: string
}

interface BackendProduto {
  id: number
  dataCadastro: string
  nome: string
  unidadesPorPack: number
  qtdAtual: number
  qtdMinima: number
  qtdMaxima: number
  custoDeCompra: number | string
  precoDeVenda: number | string
  categoria: BackendCategoria
}

interface BackendMovimentacao {
  id: number
  dataMovimentacao: string
  quantidade: number
  precoVendaUnitario: number | string
  tipo: string
  lucroEstimado: number | string
  destinoCliente: string
  conferenteResponsavel: string
  produto: { nome: string; custoDeCompra?: number | string }
}

const apiPrefix = '/api'

const construirUrl = (path: string) => `${apiPrefix}${path}`

const formatarDataBR = (valor: string | Date) => {
  const date = typeof valor === 'string' ? new Date(valor) : valor
  return date.toLocaleDateString('pt-BR')
}

const formatarHorarioBR = (valor: string | Date) => {
  const date = typeof valor === 'string' ? new Date(valor) : valor
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

const mapProdutoBackendToFrontend = (produto: BackendProduto): Produto => ({
  id: String(produto.id),
  nome: produto.nome,
  categoria: produto.categoria?.nome ?? 'Sem categoria',
  quantidade: produto.qtdAtual,
  estoqueMinimo: produto.qtdMinima,
  estoqueMaximo: produto.qtdMaxima,
  precoCusto: Number(produto.custoDeCompra),
  precoVenda: Number(produto.precoDeVenda),
  unidadePack: produto.unidadesPorPack,
  dataCriacao: formatarDataBR(produto.dataCadastro),
})

const mapMovimentacaoBackendToFrontend = (mov: BackendMovimentacao): Movimentacao => {
  const custoUnitario = Number(mov.produto?.custoDeCompra ?? 0)
  const precoVendaUnitario = Number(mov.precoVendaUnitario)
  const lucroTotal = Number(mov.lucroEstimado) || 0
  const margemUnitaria = mov.quantidade > 0 ? lucroTotal / mov.quantidade : precoVendaUnitario - custoUnitario

  return {
    id: String(mov.id),
    horario: formatarHorarioBR(mov.dataMovimentacao),
    data: formatarDataBR(mov.dataMovimentacao),
    tipo: mov.tipo === 'entrada' ? 'entrada' : 'saida',
    operacao: mov.destinoCliente || (mov.tipo === 'entrada' ? 'Entrada de Mercadoria' : 'Saída de Mercadoria'),
    quantidade: mov.quantidade,
    conferente: mov.conferenteResponsavel,
    volume: `${mov.tipo === 'entrada' ? '+' : '-'}${mov.quantidade} un`,
    valorTotal: precoVendaUnitario * mov.quantidade,
    custoUnitario,
    margemUnitaria,
    lucro: lucroTotal,
    produtoNome: mov.produto?.nome ?? 'Produto',
    lote: `#MOV-${mov.id}`,
  }
}

export const ProvedorEstoque: React.FC<ProvedorProps> = ({ children }) => {
  const [produtos, definirProdutos] = useState<Produto[]>([])
  const [movimentacoes, definirMovimentacoes] = useState<Movimentacao[]>([])

  const carregarProdutos = async () => {
    try {
      const response = await fetch(construirUrl('/produtos'))
      if (!response.ok) throw new Error('Falha ao carregar produtos')
      const dados = (await response.json()) as BackendProduto[]
      // Mapear e ordenar alfabeticamente por nome
      const mapeados = dados.map(mapProdutoBackendToFrontend)
      mapeados.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }))
      definirProdutos(mapeados)
    } catch (error) {
      console.error(error)
    }
  }

  const carregarMovimentacoes = async () => {
    try {
      const response = await fetch(construirUrl('/movimentacoes'))
      if (!response.ok) throw new Error('Falha ao carregar movimentações')
      const dados = (await response.json()) as BackendMovimentacao[]
      definirMovimentacoes(dados.map(mapMovimentacaoBackendToFrontend))
    } catch (error) {
      console.error(error)
    }
  }

  // Adiciona um registro de lucro manual ao estado (não persiste no backend)
  const adicionarLucroManual = (valor: number, motivo: string, formaPagamento: 'especie'|'pix' = 'especie', _taxaAplicada: boolean = false) => {
    const id = `manual-${Date.now()}`
    const now = new Date()

    const mov: Movimentacao = {
      id,
      horario: formatarHorarioBR(now),
      data: formatarDataBR(now),
      tipo: 'saida',
      operacao: `Lucro Manual${motivo ? ` - ${motivo}` : ''}`,
      quantidade: 1,
      conferente: formaPagamento === 'especie' ? 'Espécie' : 'PIX',
      volume: `-1 un`,
      valorTotal: valor,
      custoUnitario: 0,
      margemUnitaria: valor,
      lucro: valor,
      produtoNome: valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      lote: `#MANUAL-${id}`,
    }
    definirMovimentacoes((atuais) => [mov, ...atuais])
  }

  useEffect(() => {
    void (async () => {
      await carregarProdutos()
      await carregarMovimentacoes()
    })()
  }, [])

  const adicionarProduto = async (produtoNovo: Omit<Produto, 'id' | 'dataCriacao'>) => {
    // Ao criar produto, gravamos o produto com qtdAtual = 0 e, se houver
    // quantidade inicial informada no formulário, registramos uma movimentação
    // de entrada separada. Isso evita que a quantidade seja aplicada duas vezes
    // (uma no create e outra ao criar a movimentação).
    const response = await fetch(construirUrl('/produtos'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: produtoNovo.nome,
        unidadesPorPack: produtoNovo.unidadePack,
        qtdAtual: 0,
        qtdMinima: produtoNovo.estoqueMinimo,
        qtdMaxima: produtoNovo.estoqueMaximo,
        custoDeCompra: produtoNovo.precoCusto,
        precoDeVenda: produtoNovo.precoVenda,
        categoria: produtoNovo.categoria,
      }),
    })

    if (!response.ok) {
      throw new Error('Não foi possível cadastrar o produto.')
    }

    const novoProduto = (await response.json()) as BackendProduto

    // Se houver quantidade inicial, registre uma movimentação de entrada
    try {
      // Se a quantidade inicial informada no formulário for maior que zero,
      // registramos uma movimentação de entrada usando esse valor (produtoNovo.quantidade).
      const quantidadeInicial = Number(produtoNovo.quantidade) || 0
      if (quantidadeInicial > 0) {
        await fetch(construirUrl('/movimentacoes'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            produtoId: Number(novoProduto.id),
            quantidade: quantidadeInicial,
            precoVendaUnitario: Number(novoProduto.custoDeCompra ?? produtoNovo.precoCusto),
            tipo: 'entrada',
            lucroEstimado: 0,
            destinoCliente: 'Entrada inicial',
            conferenteResponsavel: 'Sistema',
          }),
        })
      }
    } catch (err) {
      console.error('Falha ao registrar movimentação inicial:', err)
    }

    // Recarrega lista para garantir consistência
    await carregarProdutos()
    await carregarMovimentacoes()
  }

  const editarProduto = async (id: string, produtoAtualizado: Omit<Produto, 'id' | 'dataCriacao'>) => {
    const payload = {
      nome: produtoAtualizado.nome,
      unidadesPorPack: produtoAtualizado.unidadePack,
      qtdAtual: produtoAtualizado.quantidade,
      qtdMinima: produtoAtualizado.estoqueMinimo,
      qtdMaxima: produtoAtualizado.estoqueMaximo,
      custoDeCompra: produtoAtualizado.precoCusto,
      precoDeVenda: produtoAtualizado.precoVenda,
      categoria: produtoAtualizado.categoria,
    }

    const response = await fetch(construirUrl(`/produtos/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Não foi possível editar o produto.')
    }

    const produtoAtualizadoBackend = (await response.json()) as BackendProduto

    // Atualiza lista local imediatamente
    definirProdutos((antigos) =>
      antigos.map((item) => (item.id === id ? mapProdutoBackendToFrontend(produtoAtualizadoBackend) : item))
    )

    // Se a quantidade foi alterada no formulário, registre uma movimentação automática
    try {
      const produtoAntigo = produtos.find((p) => p.id === id)
      const quantidadeAntiga = produtoAntigo?.quantidade ?? 0
      const quantidadeNova = Number(produtoAtualizadoBackend.qtdAtual ?? produtoAtualizado.quantidade)
      const diff = quantidadeNova - quantidadeAntiga

      if (diff !== 0) {
        const tipo = diff > 0 ? 'entrada' : 'saida'
        const quantidadeMov = Math.abs(diff)
        const custoUnitario = Number(produtoAtualizadoBackend.custoDeCompra ?? produtoAtualizado.precoCusto ?? produtoAntigo?.precoCusto ?? 0)
        const precoVendaUnitario = tipo === 'entrada'
          ? custoUnitario
          : Number(produtoAtualizadoBackend.precoDeVenda ?? produtoAtualizado.precoVenda ?? produtoAntigo?.precoVenda ?? 0)
        const lucroEstimado = tipo === 'saida' ? (precoVendaUnitario - custoUnitario) * quantidadeMov : 0

        await fetch(construirUrl('/movimentacoes'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            produtoId: Number(id),
            quantidade: quantidadeMov,
            precoVendaUnitario,
            tipo,
            lucroEstimado,
            destinoCliente: tipo === 'entrada' ? 'Ajuste de Estoque' : 'Ajuste de Estoque',
            conferenteResponsavel: 'Sistema',
          }),
        })
      }
    } catch (err) {
      console.error('Falha ao registrar movimentação automática de edição:', err)
    }
  }

  const excluirProduto = async (id: string) => {
    // Antes de excluir, registre uma saída com a quantidade atual (se houver)
    try {
      const produto = produtos.find((p) => p.id === id)
      if (produto && produto.quantidade > 0) {
        const custoUnitario = produto.precoCusto
        const precoVendaUnitario = produto.precoVenda
        const lucroEstimado = (precoVendaUnitario - custoUnitario) * produto.quantidade
        await fetch(construirUrl('/movimentacoes'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            produtoId: Number(id),
            quantidade: produto.quantidade,
            precoVendaUnitario,
            tipo: 'saida',
            lucroEstimado,
            destinoCliente: 'Remoção de produto',
            conferenteResponsavel: 'Sistema',
          }),
        })
      }
    } catch (err) {
      console.error('Falha ao registrar movimentação de exclusão:', err)
    }

    const response = await fetch(construirUrl(`/produtos/${id}`), {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Não foi possível excluir o produto.')
    }

    // Recarrega listas para garantir consistência
    await carregarProdutos()
    await carregarMovimentacoes()
  }

  const registrarEntrada = async (
    produtoId: string,
    quantidade: number,
    custoUnidade: number,
    conferente: string
  ): Promise<boolean> => {
    const response = await fetch(construirUrl('/movimentacoes'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        produtoId: Number(produtoId),
        quantidade,
        precoVendaUnitario: custoUnidade,
        tipo: 'entrada',
        lucroEstimado: 0,
        destinoCliente: 'Entrada de estoque',
        conferenteResponsavel: conferente,
      }),
    })

    if (!response.ok) {
      return false
    }

    await carregarProdutos()
    await carregarMovimentacoes()
    return true
  }

  const registrarSaida = async (
    produtoId: string,
    quantidade: number,
    precoVenda: number,
    motivo?: string
  ): Promise<boolean> => {
    const produto = produtos.find((item) => item.id === produtoId)
    const custoUnidade = produto?.precoCusto ?? 0
    const lucroEstimado = (precoVenda - custoUnidade) * quantidade

    const response = await fetch(construirUrl('/movimentacoes'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        produtoId: Number(produtoId),
        quantidade,
        precoVendaUnitario: precoVenda,
        tipo: 'saida',
        lucroEstimado,
        destinoCliente: motivo ? `Saída de Mercadoria - ${motivo}` : 'Saída de Mercadoria',
        conferenteResponsavel: 'Sistema',
      }),
    })

    if (!response.ok) {
      return false
    }

    await carregarProdutos()
    await carregarMovimentacoes()
    return true
  }

  const excluirMovimentacao = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(construirUrl(`/movimentacoes/${id}`), { method: 'DELETE' })
      if (!response.ok) return false

      // Atualiza UI imediatamente removendo a movimentação do estado
      definirMovimentacoes((atuais) => atuais.filter((m) => m.id !== id))

      // Atualiza listas em background sem bloquear a UI (fire-and-forget)
      carregarProdutos().catch((err) => console.error('Erro recarregando produtos após exclusão:', err))
      carregarMovimentacoes().catch((err) => console.error('Erro recarregando movimentações após exclusão:', err))

      return true
    } catch (err) {
      console.error('Falha ao excluir movimentação:', err)
      return false
    }
  }

  const alterarQuantidadeRapida = async (produtoId: string, diferenca: number) => {
    const produto = produtos.find((item) => item.id === produtoId)
    if (!produto) return

    const quantidadeAlterada = Math.abs(diferenca)
    const novaQuantidade = Math.max(0, produto.quantidade + diferenca)

    const response = await fetch(construirUrl(`/produtos/${produtoId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qtdAtual: novaQuantidade }),
    })

    if (!response.ok) {
      throw new Error('Não foi possível ajustar a quantidade.')
    }

    // Registra movimentação correspondente ao ajuste rápido
    try {
      const tipo = diferenca > 0 ? 'entrada' : 'saida'
      const precoVendaUnitario = tipo === 'entrada' ? produto.precoCusto : produto.precoVenda
      const custoUnitario = produto.precoCusto
      const lucroEstimado = tipo === 'saida' ? (precoVendaUnitario - custoUnitario) * quantidadeAlterada : 0

      await fetch(construirUrl('/movimentacoes'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produtoId: Number(produtoId),
          quantidade: quantidadeAlterada,
          precoVendaUnitario,
          tipo,
          lucroEstimado,
          destinoCliente: tipo === 'entrada' ? 'Ajuste manual' : 'Ajuste manual',
          conferenteResponsavel: 'Sistema',
        }),
      })
    } catch (err) {
      console.error('Falha ao registrar movimentação do ajuste rápido:', err)
    }

    await carregarProdutos()
    await carregarMovimentacoes()
  }

  return (
    <EstoqueContext.Provider
      value={{
        produtos,
        movimentacoes,
        adicionarProduto,
        editarProduto,
        excluirProduto,
        registrarEntrada,
        registrarSaida,
        adicionarLucroManual,
        alterarQuantidadeRapida,
        excluirMovimentacao,
      }}
    >
      {children}
    </EstoqueContext.Provider>
  )
}

export const useEstoque = () => {
  const contexto = useContext(EstoqueContext)
  if (contexto === undefined) {
    throw new Error('useEstoque deve ser utilizado em conjunto com o ProvedorEstoque')
  }
  return contexto
}