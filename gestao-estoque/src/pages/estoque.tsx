import React, { useState } from 'react';
import { useEstoque } from '../context/EstoqueContext';
import { useModal } from '../context/ModalContext';
import type { Produto } from '../context/EstoqueContext';
import {
  BotaoPrimario,
  BotaoSecundario,
  BotaoExcluir,
  BotaoQuantidade,
} from '../components/botoes';
import {
  CampoTexto,
  CampoNumero,
  CampoSelecao,
  CampoMonetario,
} from '../components/inputs';
import { exportarProdutosPDF } from '../utils/pdfExport';
import {
  ContainerTabela,
  TabelaDados,
  LinhaCabecalho,
  CelulaCabecalho,
  LinhaDados,
  CelulaDados,
  ContainerBarraProgresso,
  PreenchimentoProgresso,
  BadgeStatus,
  OverlayModal,
  JanelaModal,
} from '../styles/estoque';

/* ============================================================
   PÁGINA DE GESTÃO DE ESTOQUE
   Funcionalidades:
     - Listagem de produtos em tabela (desktop) / cards (mobile)
     - Busca por nome ou código SKU
     - Filtro por categoria
     - Ajuste rápido de quantidade (+/-)
     - Modal para cadastrar novo produto
     - Modal para editar produto existente
     - Exclusão de produto
   ============================================================ */

export const Estoque: React.FC = () => {
  const {
    produtos,
    adicionarProduto,
    editarProduto,
    excluirProduto,
    alterarQuantidadeRapida,
  } = useEstoque();
  const { definirTemModalAberto } = useModal();

  const [busca, definirBusca] = useState('');
  const [categoriaFiltro, definirCategoriaFiltro] = useState('todos');

  const [exibirModalAdicionar, definirExibirModalAdicionar] = useState(false);
  const [exibirModalEditar, definirExibirModalEditar] = useState(false);
  const [produtoEdicao, definirProdutoEdicao] = useState<Produto | null>(null);
  const [exibirModalConfirmarExclusao, definirExibirModalConfirmarExclusao] = useState(false);
  const [produtoParaExcluir, definirProdutoParaExcluir] = useState<string | null>(null);

  /* ── ESTADOS DOS CAMPOS DO FORMULÁRIO ── */
  const [nome, definirNome] = useState('');
  const [categoria, definirCategoria] = useState('');
  // Mantemos os valores numéricos como string para permitir campo vazio
  const [quantidade, definirQuantidade] = useState('');
  const [estoqueMinimo, definirEstoqueMinimo] = useState('');
  const [estoqueMaximo, definirEstoqueMaximo] = useState('');
  const [precoCusto, definirPrecoCusto] = useState('');
  const [precoVenda, definirPrecoVenda] = useState('');
  const [unidadePack, definirUnidadePack] = useState('');
  const [tipoSaida, definirTipoSaida] = useState<'uni' | 'pack'>('uni');

  /* ── OPÇÕES DOS DROPDOWNS ── */
  // Categorias disponíveis para seleção no formulário
  const opcoesCategorias = [
    { valor: '', texto: 'Selecione Categoria' },
    { valor: 'Cervejas', texto: 'Cervejas' },
    { valor: 'Refrigerantes', texto: 'Refrigerantes' },
    { valor: 'Águas', texto: 'Águas' },
    { valor: 'Destilados', texto: 'Destilados' },
    { valor: 'Outros', texto: 'Outros' },
    { valor: 'Besteiras', texto: 'Besteiras' },
    { valor: 'Cigarros', texto: 'Cigarros' },
  ];

  // Filtro de categorias na listagem (inclui "Todas")
  const opcoesFiltro = [
    { valor: 'todos', texto: 'Todas Categorias' },
    ...opcoesCategorias,
  ];

  /* ── HANDLERS DOS MODAIS ── */

  // Abre o modal de cadastro com os campos zerados
  const abrirModalCadastro = () => {
    definirNome('');
    definirCategoria('');
    definirQuantidade('');
    definirEstoqueMinimo('');
    definirEstoqueMaximo('');
    definirPrecoCusto('');
    definirPrecoVenda('');
    definirUnidadePack('');
    definirTipoSaida('uni');
    definirExibirModalAdicionar(true);
    definirTemModalAberto(true);
  };

  // Abre o modal de edição preenchido com os dados do produto selecionado
  const abrirModalEdicao = (produto: Produto) => {
    definirProdutoEdicao(produto);
    definirNome(produto.nome);
    definirCategoria(produto.categoria);
    definirQuantidade(String(produto.quantidade));
    definirEstoqueMinimo(String(produto.estoqueMinimo));
    definirEstoqueMaximo(String(produto.estoqueMaximo));
    definirPrecoCusto(produto.precoCusto.toString().replace('.', ','));
    definirPrecoVenda(produto.precoVenda.toString().replace('.', ','));
    definirUnidadePack(String(produto.unidadePack));
    // Inferir tipo de saída a partir do unidadePack (1 = unidade)
    definirTipoSaida(produto.unidadePack && produto.unidadePack > 1 ? 'pack' : 'uni');
    definirExibirModalEditar(true);
    definirTemModalAberto(true);
  };

  // Salva o novo produto e fecha o modal
  const lidarComSalvarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !precoCusto || !precoVenda) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const custo = parseFloat(precoCusto.replace(',', '.'));
    const venda = parseFloat(precoVenda.replace(',', '.'));
    // Converte os campos numéricos (strings) antes de enviar
    const quantidadeNum = parseInt(quantidade, 10) || 0;
    const estoqueMinNum = parseInt(estoqueMinimo, 10) || 0;
    const estoqueMaxNum = parseInt(estoqueMaximo, 10) || 0;
    // Se tipo de saída for unidade, força unidadePack = 1
    const unidadePackNum = tipoSaida === 'uni' ? 1 : parseInt(unidadePack, 10) || 1;
    adicionarProduto({
      nome,
      categoria,
      quantidade: quantidadeNum,
      estoqueMinimo: estoqueMinNum,
      estoqueMaximo: estoqueMaxNum,
      precoCusto: custo,
      precoVenda: venda,
      unidadePack: unidadePackNum,
      // lucroManual e adicionarJuros movidos para modal de saída
      tipoSaida,
    } as any);
    definirExibirModalAdicionar(false);
    definirTemModalAberto(false);
  };

  // Salva a edição do produto e fecha o modal
  const lidarComEditarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!produtoEdicao || !nome.trim() || !precoCusto || !precoVenda) return;
    const custo = parseFloat(precoCusto.replace(',', '.'));
    const venda = parseFloat(precoVenda.replace(',', '.'));
    const quantidadeNum = parseInt(quantidade, 10) || 0;
    const estoqueMinNum = parseInt(estoqueMinimo, 10) || 0;
    const estoqueMaxNum = parseInt(estoqueMaximo, 10) || 0;
    const unidadePackNum = tipoSaida === 'uni' ? 1 : parseInt(unidadePack, 10) || 1;
    editarProduto(produtoEdicao.id, {
      nome,
      categoria,
      quantidade: quantidadeNum,
      estoqueMinimo: estoqueMinNum,
      estoqueMaximo: estoqueMaxNum,
      precoCusto: custo,
      precoVenda: venda,
      unidadePack: unidadePackNum,
      tipoSaida,
    } as any);
    definirExibirModalEditar(false);
    definirTemModalAberto(false);
    definirProdutoEdicao(null);
  };

  /* ── FILTRAGEM DOS PRODUTOS ── */
  // Aplica busca por texto (nome ou SKU) + filtro por categoria
  const produtosFiltrados = produtos.filter((item) => {
    const correspondeBusca =
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.id.toLowerCase().includes(busca.toLowerCase());
    const correspondeCategoria =
      categoriaFiltro === 'todos' || item.categoria === categoriaFiltro;
    return correspondeBusca && correspondeCategoria;
  });

  /* ── UTILITÁRIOS ── */

  // Retorna a cor e o texto do badge de status baseado nos limites de estoque
  const calcularCorEStatus = (qtd: number, min: number) => {
    if (qtd <= min * 0.5) return { cor: 'erro' as const, status: 'critico' as const, texto: 'Crítico' };
    if (qtd <= min)       return { cor: 'alerta' as const, status: 'alerta' as const, texto: 'Alerta' };
    if (qtd >= min * 2)   return { cor: 'sucesso' as const, status: 'alto' as const, texto: 'Alto' };
    return { cor: 'sucesso' as const, status: 'estavel' as const, texto: 'Estável' };
  };

  // Retorna o ícone correspondente à categoria do produto
  const iconeCategoria = (categoria: string) => {
    if (categoria === 'Cervejas')     return 'sports_bar';
    if (categoria === 'Refrigerantes') return 'local_drink';
    if (categoria === 'Águas')        return 'water_drop';
    if (categoria === 'Outros')       return 'category';
    return 'liquor';
  };

  // Calcula margem de lucro bruta em tempo real no formulário
  const custoFloat = parseFloat(precoCusto.replace(',', '.'));
  const vendaFloat = parseFloat(precoVenda.replace(',', '.'));
  const margemCalculada = !isNaN(custoFloat) && !isNaN(vendaFloat) ? vendaFloat - custoFloat : 0;

  /* ══════════════════════════════════════════════════
     RENDERIZAÇÃO PRINCIPAL DA PÁGINA
     ══════════════════════════════════════════════════ */

  return (
    <div className="space-y-6 md:space-y-8">

      {/* ── CABEÇALHO DA PÁGINA ──
          Mobile: empilhado | Desktop: lado a lado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
            Gestão de Estoque
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Controle de inventário de bebidas, packs e reposições.
          </p>
        </div>

        {/* Botões de ação do cabeçalho */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Botão exportar PDF */}
          <button
            onClick={() => exportarProdutosPDF(produtosFiltrados)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold border border-[#c7c4d8]/60 bg-white hover:bg-[#f5f2ff] text-on-surface-variant shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-base">description</span>
            <span className="hidden sm:inline">Exportar PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          {/* Botão cadastrar novo produto */}
          <button
            onClick={abrirModalCadastro}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#3525cd] hover:bg-[#4d44e3] text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Cadastrar Produto</span>
          </button>
        </div>
      </div>

      {/* ── BARRA DE FILTROS E BUSCA ──
          Mobile: campo de busca + select empilhados
          Desktop: lado a lado
          Oculta quando algum modal está aberto */}
      {!(exibirModalAdicionar || exibirModalEditar) && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between bg-white p-3 sm:p-4 rounded-xl border border-[#c7c4d8]/40 shadow-sm">

          {/* Campo de busca por nome ou código SKU */}
          <div className="relative w-full sm:max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777587] text-lg">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#f5f2ff] border-none rounded-lg text-sm focus:ring-1 focus:ring-[#3525cd] outline-none"
              placeholder="Buscar por nome ou código..."
              type="text"
              value={busca}
              onChange={(e) => definirBusca(e.target.value)}
            />
          </div>

          {/* Filtro de categoria */}
          <div className="w-full sm:w-auto">
            <select
              className="w-full sm:w-auto px-4 py-2 bg-white border border-[#c7c4d8]/60 rounded-lg text-sm text-[#1b1b24] outline-none cursor-pointer"
              value={categoriaFiltro}
              onChange={(e) => definirCategoriaFiltro(e.target.value)}
            >
              {opcoesFiltro.map((op) => (
                <option key={op.valor} value={op.valor}>{op.texto}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── TABELA DE PRODUTOS ──
          ContainerTabela tem overflow-x: auto para scroll horizontal em mobile.
          Colunas "Código SKU" e badge de status ficam ocultos em telas pequenas. */}
      {/* ── TABELA DE PRODUTOS (DESKTOP / TABLET) ── */}
      <ContainerTabela className="hidden md:block custom-scrollbar">
        <TabelaDados>
          <thead>
            <LinhaCabecalho>
              {/* Produto: sempre visível */}
              <CelulaCabecalho>Produto</CelulaCabecalho>
              {/* ID do produto: oculto em mobile (hidden md:table-cell) */}
              <CelulaCabecalho className="hidden md:table-cell">ID</CelulaCabecalho>
              {/* Data de Cadastro: oculto em mobile (hidden md:table-cell) */}
              <CelulaCabecalho className="hidden md:table-cell">Data Cadastro</CelulaCabecalho>
              {/* Preço: sempre visível */}
              <CelulaCabecalho>Preço (Venda)</CelulaCabecalho>
              {/* Estoque: sempre visível */}
              <CelulaCabecalho>Estoque Atual</CelulaCabecalho>
              {/* Ações: sempre visível */}
              <CelulaCabecalho className="text-right">Ações</CelulaCabecalho>
            </LinhaCabecalho>
          </thead>
          <tbody>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((item) => {
                const indicador = calcularCorEStatus(item.quantidade, item.estoqueMinimo);
                const porcentagemBarra = (item.quantidade / item.estoqueMaximo) * 100;

                return (
                  <LinhaDados key={item.id}>

                    {/* ── COLUNA: PRODUTO (ícone + nome + categoria) ── */}
                    <CelulaDados>
                      <div className="flex items-center gap-2 md:gap-3">
                        {/* Ícone da categoria */}
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#3525cd]/10 flex items-center justify-center text-[#3525cd] shrink-0">
                          <span className="material-symbols-outlined text-base md:text-lg">
                            {iconeCategoria(item.categoria)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-xs md:text-sm text-on-surface line-clamp-1">
                            {item.nome}
                          </div>
                          <div className="text-xs text-on-surface-variant">{item.categoria}</div>
                        </div>
                      </div>
                    </CelulaDados>

                    {/* ── COLUNA: CÓDIGO SKU (oculto em mobile) ── */}
                    <CelulaDados className="hidden md:table-cell font-mono text-xs text-on-surface-variant">
                      {item.id}
                    </CelulaDados>

                    {/* ── COLUNA: DATA DE CADASTRO (oculto em mobile) ── */}
                    <CelulaDados className="hidden md:table-cell text-xs text-on-surface-variant">
                      {item.dataCriacao}
                    </CelulaDados>

                    {/* ── COLUNA: PREÇO DE VENDA ── */}
                    <CelulaDados className="font-bold text-sm md:text-base">
                      {item.precoVenda.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </CelulaDados>

                    {/* ── COLUNA: NÍVEL DE ESTOQUE (barra + badge) ── */}
                    <CelulaDados>
                      <div className="flex items-center gap-2 md:gap-3">
                        {/* Barra de progresso + quantidade/mínimo */}
                        <div className="flex flex-col gap-1 w-20 md:w-36">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className={item.quantidade <= item.estoqueMinimo ? 'text-[#ba1a1a]' : 'text-[#006c49]'}>
                              {item.quantidade} un
                            </span>
                            <span className="text-on-surface-variant/50 font-normal hidden sm:block">
                              Min: {item.estoqueMinimo}
                            </span>
                          </div>
                          <ContainerBarraProgresso>
                            <PreenchimentoProgresso
                              $porcentagem={porcentagemBarra}
                              $cor={indicador.cor}
                            />
                          </ContainerBarraProgresso>
                        </div>
                        {/* Badge de status (Crítico / Alerta / Alto / Estável) — oculto em mobile muito pequeno */}
                        <BadgeStatus $status={indicador.status} className="hidden sm:inline-block">
                          {indicador.texto}
                        </BadgeStatus>
                      </div>
                    </CelulaDados>

                    {/* ── COLUNA: AÇÕES (decrementar, incrementar, editar, excluir) ── */}
                    <CelulaDados className="text-right">
                      <div className="flex items-center justify-end gap-1 md:gap-2">
                        {/* Botão decrementar quantidade */}
                        <BotaoQuantidade
                          tipo="decrementar"
                          onClick={() => alterarQuantidadeRapida(item.id, -1)}
                          disabled={item.quantidade <= 0}
                        />
                        {/* Botão incrementar quantidade */}
                        <BotaoQuantidade
                          tipo="incrementar"
                          onClick={() => alterarQuantidadeRapida(item.id, 1)}
                        />
                        {/* Separador visual — oculto em mobile */}
                        <span className="w-px h-5 bg-[#c7c4d8]/40 mx-1 hidden sm:inline-block"></span>
                        {/* Botão de editar produto */}
                        <button
                          onClick={() => abrirModalEdicao(item)}
                          className="p-1.5 md:p-2 text-[#464555] hover:text-[#3525cd] hover:bg-[#3525cd]/10 rounded-full transition-all"
                          title="Editar dados"
                        >
                          <span className="material-symbols-outlined text-base md:text-lg">edit</span>
                        </button>
                        {/* Botão de excluir produto */}
                        <BotaoExcluir onClick={() => {
                          definirProdutoParaExcluir(item.id);
                          definirExibirModalConfirmarExclusao(true);
                        }} />
                      </div>
                    </CelulaDados>
                  </LinhaDados>
                );
              })
            ) : (
              /* Estado vazio quando nenhum produto corresponde ao filtro */
              <tr>
                <td colSpan={5} className="text-center py-10 text-on-surface-variant opacity-60">
                  Nenhum produto correspondente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </TabelaDados>
      </ContainerTabela>

      {/* ── LISTAGEM DE PRODUTOS EM CARDS (MOBILE / TABLET COMPACTO) ── */}
      <div className="md:hidden space-y-4">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((item) => {
            const indicador = calcularCorEStatus(item.quantidade, item.estoqueMinimo);
            const porcentagemBarra = (item.quantidade / item.estoqueMaximo) * 100;

            return (
              <div key={item.id} className="bg-white border border-[#c7c4d8]/40 rounded-xl p-4 shadow-sm space-y-3">
                {/* Cabeçalho do Card: Ícone, Nome, SKU e Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#3525cd]/10 flex items-center justify-center text-[#3525cd] shrink-0">
                      <span className="material-symbols-outlined text-base">
                        {iconeCategoria(item.categoria)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-on-surface line-clamp-1">
                        {item.nome}
                      </h4>
                      <p className="text-[10px] text-on-surface-variant font-mono">{item.id}</p>
                    </div>
                  </div>
                  <BadgeStatus $status={indicador.status}>
                    {indicador.texto}
                  </BadgeStatus>
                </div>

                {/* Detalhes: Preço de Venda e Nível de Estoque */}
                <div className="flex justify-between items-center gap-4 pt-1">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-wider">
                      Preço Venda
                    </span>
                    <span className="font-bold text-sm">
                      {item.precoVenda.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-1 max-w-[150px]">
                    <div className="flex justify-between text-xs font-semibold w-full">
                      <span className={item.quantidade <= item.estoqueMinimo ? 'text-[#ba1a1a]' : 'text-[#006c49]'}>
                        {item.quantidade} un
                      </span>
                      <span className="text-on-surface-variant/50 font-normal">
                        Mín: {item.estoqueMinimo}
                      </span>
                    </div>
                    <ContainerBarraProgresso>
                      <PreenchimentoProgresso
                        $porcentagem={porcentagemBarra}
                        $cor={indicador.cor}
                      />
                    </ContainerBarraProgresso>
                  </div>
                </div>

                {/* Rodapé: Controles Rápidos e Ações */}
                <div className="flex items-center justify-between pt-2 border-t border-[#f0ecf9]">
                  {/* Incremento/Decremento Rápido */}
                  <div className="flex items-center gap-2">
                    <BotaoQuantidade
                      tipo="decrementar"
                      onClick={() => alterarQuantidadeRapida(item.id, -1)}
                      disabled={item.quantidade <= 0}
                    />
                    <span className="text-xs font-semibold text-on-surface w-8 text-center">
                      {item.quantidade}
                    </span>
                    <BotaoQuantidade
                      tipo="incrementar"
                      onClick={() => alterarQuantidadeRapida(item.id, 1)}
                    />
                  </div>

                  {/* Ações (Editar/Excluir) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => abrirModalEdicao(item)}
                      className="p-2 text-[#464555] hover:text-[#3525cd] hover:bg-[#3525cd]/10 rounded-full transition-all"
                      title="Editar dados"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <BotaoExcluir onClick={() => {
                      definirProdutoParaExcluir(item.id);
                      definirExibirModalConfirmarExclusao(true);
                    }} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-on-surface-variant opacity-60 bg-white rounded-xl border border-[#c7c4d8]/40">
            Nenhum produto correspondente encontrado.
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          1. MODAL: CADASTRAR NOVO PRODUTO
          Em mobile: sobe do rodapé como bottom sheet
          Em desktop: popup centralizado
          ══════════════════════════════════════════════════ */}
      {exibirModalAdicionar && (
        <OverlayModal onClick={(e) => { if (e.target === e.currentTarget) definirExibirModalAdicionar(false); }}>
          <JanelaModal>

            {/* Cabeçalho do Modal */}
            <div className="px-4 md:px-6 py-4 border-b border-[#c7c4d8]/40 flex justify-between items-center bg-[#f5f2ff] shrink-0">
              <div>
                <h3 className="font-bold text-base md:text-lg text-on-surface">Novo Produto</h3>
                <p className="text-xs text-on-surface-variant">Cadastro de item no catálogo de inventário</p>
              </div>
              <button
                className="p-1 hover:bg-[#eae6f4] rounded-full text-on-surface-variant"
                onClick={() => definirExibirModalAdicionar(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Formulário de Cadastro */}
            <form onSubmit={lidarComSalvarProduto} className="p-4 md:p-6 space-y-5 overflow-y-auto">

              {/* ─ Data de Cadastro (somente leitura) ─ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span>Data de Cadastro</span>
                </h4>
                <CampoTexto
                  rotulo="Data"
                  value={new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').reverse().join('/')}
                  readOnly
                  disabled
                />
              </div>

              {/* ─ Seção: Identificação do produto ─ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">tag</span>
                  <span>Identificação</span>
                </h4>
                <CampoTexto
                  rotulo="Nome do Produto"
                  placeholder="Ex: Cerveja IPA 600ml"
                  value={nome}
                  onChange={(e) => definirNome(e.target.value)}
                  required
                />
                {/* Grid 2 colunas: Categoria + Unidades por Pack */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <CampoSelecao
                    rotulo="Categoria"
                    opcoes={opcoesCategorias}
                    value={categoria}
                    onChange={(e) => definirCategoria(e.target.value)}
                  />
                  <div>
                    <CampoNumero
                      rotulo="Unidades por Pack"
                      value={unidadePack}
                      onChange={(e) => definirUnidadePack(e.target.value)}
                      min={1}
                    />
                    <CampoSelecao
                      rotulo="Tipo de Saída"
                      opcoes={[{ valor: 'uni', texto: 'Unidade (uni)' }, { valor: 'pack', texto: 'Pack' }].map(o => ({ valor: o.valor, texto: o.texto }))}
                      value={tipoSaida}
                      onChange={(e) => definirTipoSaida(e.target.value as 'uni' | 'pack')}
                    />
                  </div>
                </div>
              </div>

              {/* ─ Seção: Controle de Estoque ─ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  <span>Controle de Estoque</span>
                </h4>
                {/* Grid 3 colunas: Qtd Atual, Qtd Mínima, Qtd Máxima */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <CampoNumero
                    rotulo="Qtd Atual"
                    value={quantidade}
                    onChange={(e) => definirQuantidade(e.target.value)}
                  />
                  <CampoNumero
                    rotulo="Qtd Mínima"
                    value={estoqueMinimo}
                    onChange={(e) => definirEstoqueMinimo(e.target.value)}
                  />
                  <CampoNumero
                    rotulo="Qtd Máxima"
                    value={estoqueMaximo}
                    onChange={(e) => definirEstoqueMaximo(e.target.value)}
                  />
                </div>
              </div>

              {/* ─ Seção: Financeiro (custo e venda) ─ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">payments</span>
                  <span>Financeiro</span>
                </h4>
                {/* Caixas de preço com fundo diferenciado */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#f5f2ff] rounded-xl border border-[#c7c4d8]/20">
                  <CampoMonetario
                    rotulo="Custo de Compra"
                    value={precoCusto}
                    onChange={(e) => definirPrecoCusto(e.target.value)}
                    required
                  />
                  <CampoMonetario
                    rotulo="Preço de Venda"
                    value={precoVenda}
                    onChange={(e) => definirPrecoVenda(e.target.value)}
                    required
                  />
                </div>
                {/* Lucro manual e taxa de juros */}
                {/* Lucro manual e taxa removidos daqui — agora no modal de Saída */}
                {/* Cálculo automático da margem de lucro */}
                <div className="flex justify-between items-center px-2 py-1 text-xs">
                  <span className="text-on-surface-variant font-medium">Margem de Lucro Bruta (Und):</span>
                  <span className={`font-bold text-sm ${margemCalculada >= 0 ? 'text-[#006c49]' : 'text-[#ba1a1a]'}`}>
                    {margemCalculada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>

              {/* ─ Botões de Ação do Modal ─ */}
              <div className="flex gap-3 pt-2">
                <BotaoSecundario type="button" className="flex-1" onClick={() => {
                  definirExibirModalAdicionar(false);
                  definirTemModalAberto(false);
                }}>
                  Cancelar
                </BotaoSecundario>
                <BotaoPrimario type="submit" className="flex-[2]">
                  Salvar Produto
                </BotaoPrimario>
              </div>
            </form>
          </JanelaModal>
        </OverlayModal>
      )}

      {/* ══════════════════════════════════════════════════
          2. MODAL: EDITAR PRODUTO EXISTENTE
          Mesmo padrão de responsividade do modal de cadastro
          ══════════════════════════════════════════════════ */}
      {exibirModalEditar && produtoEdicao && (
        <OverlayModal onClick={(e) => { if (e.target === e.currentTarget) definirExibirModalEditar(false); }}>
          <JanelaModal>

            {/* Cabeçalho com código do produto */}
            <div className="px-4 md:px-6 py-4 border-b border-[#c7c4d8]/40 flex justify-between items-center bg-[#f5f2ff] shrink-0">
              <div>
                <h3 className="font-bold text-base md:text-lg text-on-surface">Editar Produto</h3>
                <p className="text-xs text-on-surface-variant">ID: {produtoEdicao.id}</p>
              </div>
              <button
                className="p-1 hover:bg-[#eae6f4] rounded-full text-on-surface-variant"
                onClick={() => definirExibirModalEditar(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Formulário de Edição */}
            <form onSubmit={lidarComEditarProduto} className="p-4 md:p-6 space-y-5 overflow-y-auto">

              {/* ─ Data de Cadastro (somente leitura) ─ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span>Data de Cadastro</span>
                </h4>
                <CampoTexto
                  rotulo="Data"
                  value={produtoEdicao?.dataCriacao || ''}
                  readOnly
                  disabled
                />
              </div>

              {/* ─ Seção: Identificação ─ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">tag</span>
                  <span>Identificação</span>
                </h4>
                <CampoTexto
                  rotulo="Nome do Produto"
                  value={nome}
                  onChange={(e) => definirNome(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <CampoSelecao
                    rotulo="Categoria"
                    opcoes={opcoesCategorias}
                    value={categoria}
                    onChange={(e) => definirCategoria(e.target.value)}
                  />
                  <CampoNumero
                    rotulo="Unidades por Pack"
                    value={unidadePack}
                    onChange={(e) => definirUnidadePack(e.target.value)}
                    min={1}
                  />
                  <CampoSelecao
                    rotulo="Tipo de Saída"
                    opcoes={[{ valor: 'uni', texto: 'Unidade (uni)' }, { valor: 'pack', texto: 'Pack' }].map(o => ({ valor: o.valor, texto: o.texto }))}
                    value={tipoSaida}
                    onChange={(e) => definirTipoSaida(e.target.value as 'uni' | 'pack')}
                  />
                </div>
              </div>

              {/* ─ Seção: Controle de Estoque ─ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  <span>Estoque</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <CampoNumero
                    rotulo="Quantidade"
                    value={quantidade}
                    onChange={(e) => definirQuantidade(e.target.value)}
                  />
                  <CampoNumero
                    rotulo="Mínimo"
                    value={estoqueMinimo}
                    onChange={(e) => definirEstoqueMinimo(e.target.value)}
                  />
                  <CampoNumero
                    rotulo="Máximo"
                    value={estoqueMaximo}
                    onChange={(e) => definirEstoqueMaximo(e.target.value)}
                  />
                </div>
              </div>

              {/* ─ Seção: Valores / Financeiro ─ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#3525cd] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">payments</span>
                  <span>Valores</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#f5f2ff] rounded-xl border border-[#c7c4d8]/20">
                  <CampoMonetario
                    rotulo="Custo Compra"
                    value={precoCusto}
                    onChange={(e) => definirPrecoCusto(e.target.value)}
                    required
                  />
                  <CampoMonetario
                    rotulo="Preço Venda"
                    value={precoVenda}
                    onChange={(e) => definirPrecoVenda(e.target.value)}
                    required
                  />
                </div>
                {/* Lucro manual e taxa removidos daqui — agora no modal de Saída */}
                {/* Margem calculada em tempo real */}
                <div className="flex justify-between items-center px-2 py-1 text-xs">
                  <span className="text-on-surface-variant font-medium">Margem Estimada (Und):</span>
                  <span className={`font-bold text-sm ${margemCalculada >= 0 ? 'text-[#006c49]' : 'text-[#ba1a1a]'}`}>
                    {margemCalculada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>

              {/* ─ Botões de Ação ─ */}
              <div className="flex gap-3 pt-2">
                <BotaoSecundario type="button" className="flex-1" onClick={() => {
                  definirExibirModalEditar(false);
                  definirTemModalAberto(false);
                }}>
                  Cancelar
                </BotaoSecundario>
                <BotaoPrimario type="submit" className="flex-[2]">
                  Salvar Edição
                </BotaoPrimario>
              </div>
            </form>
          </JanelaModal>
        </OverlayModal>
      )}
      {/* ── MODAL DE CONFIRMAÇÃO DE EXCLUSÃO ── */}
      {exibirModalConfirmarExclusao && (
        <OverlayModal onClick={(e) => { if (e.target === e.currentTarget) definirExibirModalConfirmarExclusao(false); }}>
          <JanelaModal style={{ maxWidth: '440px' }}>
            {/* Cabeçalho do modal */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-2 pb-4 border-b border-[#c7c4d8]/40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#fff1f2] flex items-center justify-center ring-1 ring-[#f5c2c7]">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-2xl">warning</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface">Confirmar Exclusão</h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">Ação irreversível</p>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => definirExibirModalConfirmarExclusao(false)}
                  className="text-[#464555] hover:bg-[#f5f2ff] rounded-full p-1 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Corpo do modal */}
            <div className="py-6 text-center">
              <p className="text-[#464555] text-sm leading-relaxed">
                Tem certeza que deseja excluir este produto? <br />
                {produtoParaExcluir ? (
                  <span className="font-semibold text-on-surface block mt-2">{produtos.find(p => p.id === produtoParaExcluir)?.nome}</span>
                ) : null}
              </p>
            </div>

            {/* Botões de ação — empilhados em mobile, alinhados em desktop */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <BotaoSecundario
                type="button"
                className="w-full"
                onClick={() => definirExibirModalConfirmarExclusao(false)}
              >
                Cancelar
              </BotaoSecundario>
              <div className="w-full">
                <button
                  onClick={() => {
                    if (produtoParaExcluir) {
                      excluirProduto(produtoParaExcluir);
                    }
                    definirExibirModalConfirmarExclusao(false);
                    definirProdutoParaExcluir(null);
                    window.location.reload();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#ba1a1a] hover:bg-[#9e1616] text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all"
                >
                  <span className="material-symbols-outlined">delete</span>
                  <span>Excluir Produto</span>
                </button>
              </div>
            </div>
          </JanelaModal>
        </OverlayModal>
      )}
    </div>
  );
};
