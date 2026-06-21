import React, { useState } from 'react';
import { useEstoque } from '../context/EstoqueContext';
import { useModal } from '../context/ModalContext';
import {
  ContainerLinhaTempo,
  LinhaVertical,
  ItemLinhaTempo,
  IconeFluxo,
  CardMovimentacao,
  DistintivoFluxo,
} from '../styles/movimentacoes';
import { OverlayModal, JanelaModal } from '../styles/estoque';
import { CampoTexto, CampoNumero, CampoSelecao, CampoMonetario } from '../components/inputs';
import { BotaoPrimario, BotaoSecundario } from '../components/botoes';
import { exportarMovimentacoesPDF } from '../utils/pdfExport';

/* ============================================================
   PÁGINA DE MOVIMENTAÇÕES
   Exibe o histórico cronológico de entradas e saídas de carga.
   Funcionalidades:
     - Timeline com filtros (Todos / Entradas / Saídas)
     - Busca por produto, lote ou conferente
     - Modal para registrar entrada de mercadoria
     - Modal para registrar saída / expedição
     - Barra de ações flutuante no rodapé
   ============================================================ */

export const Movimentacoes: React.FC = () => {
  const { produtos, movimentacoes, registrarEntrada, registrarSaida, excluirMovimentacao, adicionarLucroManual } = useEstoque();
  const { definirTemModalAberto } = useModal();

  /* ── ESTADOS DE BUSCA E FILTRO DA TIMELINE ── */
  const [busca, definirBusca] = useState('');
  const [filtroTipo, definirFiltroTipo] = useState<'todos' | 'entrada' | 'saida'>('todos');

  /* ── ESTADOS DE CONTROLE DOS MODAIS ── */
  const [exibirModalEntrada, definirExibirModalEntrada] = useState(false);
  const [exibirModalSaida, definirExibirModalSaida] = useState(false);
  const [exibirModalAdicionarLucro, definirExibirModalAdicionarLucro] = useState(false);

  /* ── ESTADOS DE SELEÇÃO E EXCLUSÃO DE MOVIMENTAÇÕES ── */
  const [modoSelecao, definirModoSelecao] = useState(false);
  const [idsSelecionados, definirIdsSelecionados] = useState<string[]>([]);
  const [exibirModalConfirmarExclusao, definirExibirModalConfirmarExclusao] = useState(false);
  const [excluindo, definirExcluindo] = useState(false);

  /* ── ESTADOS DO FORMULÁRIO DE ENTRADA ── */
  const [entradaProdutoId, definirEntradaProdutoId] = useState('');
  const [entradaQuantidade, definirEntradaQuantidade] = useState('');
  const [entradaCustoUnitario, definirEntradaCustoUnitario] = useState('');
  const [entradaConferente, definirEntradaConferente] = useState('');

  /* ── ESTADOS DO FORMULÁRIO DE SAÍDA ── */
  const [saidaProdutoId, definirSaidaProdutoId] = useState('');
  const [saidaQuantidade, definirSaidaQuantidade] = useState('');
  const [saidaPrecoVenda, definirSaidaPrecoVenda] = useState('');
  const [saidaTipo, definirSaidaTipo] = useState<'uni' | 'pack'>('uni');
  const [saidaLucroManual, definirSaidaLucroManual] = useState('');
  const [saidaAdicionarJuros, definirSaidaAdicionarJuros] = useState(false);
  const [saidaValorTaxa, definirSaidaValorTaxa] = useState('1,00');
  const [mostrarAdicionarLucro, definirMostrarAdicionarLucro] = useState(false);
  const [saidaMotivoLucro, definirSaidaMotivoLucro] = useState('');
  const [saidaFormaPagamento, definirSaidaFormaPagamento] = useState<'especie'|'pix'>('especie');
  // Estado para taxa editável no modal de lucro manual
  const [taxaManualValor, definirTaxaManualValor] = useState('1,00');

  /* ── OPÇÕES DO DROPDOWN DE PRODUTOS ── */
  const opcoesProdutos = [
    { valor: '', texto: 'Selecione um produto...' },
    ...produtos.map((p) => ({ valor: p.id, texto: `${p.nome} (Qtd: ${p.quantidade})` })),
  ];

  /* ── CÁLCULO DE MARGEM DINÂMICA NO MODAL DE SAÍDA ── */
  // Custo médio do produto selecionado para calcular a margem de lucro
  const produtoSaidaSelecionado = produtos.find((p) => p.id === saidaProdutoId);
  const custoUnitarioSaida = produtoSaidaSelecionado ? produtoSaidaSelecionado.precoCusto : 0;
  const precoVendaFloat = parseFloat(saidaPrecoVenda.replace(',', '.')) || 0;
  const saidaQuantidadeNum = parseInt(saidaQuantidade, 10) || 0;
  // Ajusta a margem estimada incluindo lucro manual e taxa quando aplicáveis
  const lucroManualFloat = parseFloat(saidaLucroManual.replace(',', '.')) || 0;
  const taxaJurosFloat = parseFloat(saidaValorTaxa.replace(',', '.')) || 0;
  const taxaJuros = saidaAdicionarJuros ? taxaJurosFloat : 0;
  const precoVendaUnitarioComAjustes = precoVendaFloat + lucroManualFloat + taxaJuros;
  const margemEstimadaUnidadeComAjustes = precoVendaUnitarioComAjustes - custoUnitarioSaida;
  const margemEstimadaTotalComAjustes = margemEstimadaUnidadeComAjustes * saidaQuantidadeNum;

  /* ── FUNÇÕES DE ABERTURA DOS MODAIS ── */

  // Abre modal de entrada com todos os inputs zerados
  const abrirModalEntrada = () => {
    definirEntradaProdutoId('');
    definirEntradaQuantidade('');
    definirEntradaCustoUnitario('');
    definirEntradaConferente('');
    definirExibirModalEntrada(true);
    definirTemModalAberto(true);
  };

  // Confirmação de adicionar lucro manual (modal dedicado)
  const confirmarAdicionarLucro = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseFloat(saidaLucroManual.replace(',', '.')) || 0;
    const taxaValor = parseFloat(taxaManualValor.replace(',', '.')) || 0;
    const taxa = saidaAdicionarJuros ? taxaValor : 0;
    
    // Se adicionar taxa, apenas a taxa vai para os lucros, conforme solicitado
    const valorFinal = saidaAdicionarJuros ? taxa : valor;

    if (valorFinal <= 0) { alert('Informe um valor de lucro válido ou preencha o valor da taxa.'); return; }

    adicionarLucroManual(valorFinal, saidaMotivoLucro, saidaFormaPagamento, saidaAdicionarJuros);
    // reset
    definirSaidaLucroManual('');
    definirSaidaAdicionarJuros(false);
    definirTaxaManualValor('1,00');
    definirSaidaMotivoLucro('');
    definirExibirModalAdicionarLucro(false);
    definirTemModalAberto(false);
  }

  // Abre modal de saída com todos os inputs zerados
  const abrirModalSaida = () => {
    definirSaidaProdutoId('');
    definirSaidaQuantidade('');
    definirSaidaPrecoVenda('');
    definirSaidaTipo('uni');
    definirSaidaLucroManual('');
    definirSaidaAdicionarJuros(false);
    definirSaidaValorTaxa('1,00');
    definirMostrarAdicionarLucro(false);
    definirSaidaMotivoLucro('');
    definirExibirModalSaida(true);
    definirTemModalAberto(true);
  };

  /* ── HANDLERS DE SUBMISSÃO ── */

  // Registra entrada de mercadoria e fecha o modal
  const lidarComEntrada = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entradaProdutoId) { alert('Por favor, selecione um produto.'); return; }
    const custo = parseFloat(entradaCustoUnitario.replace(',', '.'));
    if (isNaN(custo) || custo <= 0) { alert('Por favor, insira um valor de custo de NF válido.'); return; }
    const entradaQuantidadeNum = parseInt(entradaQuantidade, 10) || 0;
    const sucesso = await registrarEntrada(entradaProdutoId, entradaQuantidadeNum, custo, entradaConferente);
    if (sucesso) {
      definirExibirModalEntrada(false);
      definirTemModalAberto(false);
    }
  };

  // Registra saída de mercadoria e fecha o modal
  const lidarComSaida = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!saidaProdutoId) { alert('Por favor, selecione um produto.'); return; }
    const venda = parseFloat(saidaPrecoVenda.replace(',', '.'));
    if (isNaN(venda) || venda <= 0) { alert('Por favor, insira um preço de venda válido.'); return; }
    const prod = produtos.find((p) => p.id === saidaProdutoId);
    const saidaQuantidadeNum = parseInt(saidaQuantidade, 10) || 0;
    // Se for saída por pack, a quantidade a ser descontada no estoque é
    // saidaQuantidadeNum * unidadesPorPack do produto.
    const multiplicador = saidaTipo === 'pack' ? (prod?.unidadePack || 1) : 1;
    const quantidadeParaRegistrar = saidaQuantidadeNum * multiplicador;
    if (prod && prod.quantidade < quantidadeParaRegistrar) {
      alert(`Estoque insuficiente! Disponível: ${prod.quantidade} unidades.`);
      return;
    }
    const taxaValorSaida = parseFloat(saidaValorTaxa.replace(',', '.')) || 0;
    const precoFinal = venda + (parseFloat(saidaLucroManual.replace(',', '.')) || 0) + (saidaAdicionarJuros ? taxaValorSaida : 0);
    const sucesso = await registrarSaida(saidaProdutoId, quantidadeParaRegistrar, precoFinal, saidaMotivoLucro);
    if (sucesso) {
      definirExibirModalSaida(false);
      definirTemModalAberto(false);
    }
  };

  /* ── ATUALIZAÇÃO DE VALORES PADRÃO AO TROCAR PRODUTO ── */

  // Atualiza o custo padrão ao selecionar produto diferente no modal de entrada
  const atualizarProdutoEntrada = (id: string) => {
    definirEntradaProdutoId(id);
    const prod = produtos.find((p) => p.id === id);
    if (prod) definirEntradaCustoUnitario(prod.precoCusto.toString().replace('.', ','));
  };

  // Atualiza o preço de venda padrão ao selecionar produto diferente no modal de saída
  const atualizarProdutoSaida = (id: string) => {
    definirSaidaProdutoId(id);
    const prod = produtos.find((p) => p.id === id);
    if (prod) {
      definirSaidaPrecoVenda(prod.precoVenda.toString().replace('.', ','));
      // Se o produto for pack por padrão (unidadePack > 1), sugerimos tipo 'pack'
      definirSaidaTipo(prod.unidadePack && prod.unidadePack > 1 ? 'pack' : 'uni');
    }
  };

  /* ── FILTRAGEM DAS MOVIMENTAÇÕES ── */
  // Combina filtro de texto com filtro de tipo (entrada/saída/todos)
  const movimentacoesFiltradas = movimentacoes.filter((mov) => {
    const correspondeBusca =
      mov.produtoNome.toLowerCase().includes(busca.toLowerCase()) ||
      mov.operacao.toLowerCase().includes(busca.toLowerCase()) ||
      mov.lote.toLowerCase().includes(busca.toLowerCase());
    const correspondeTipo = filtroTipo === 'todos' || mov.tipo === filtroTipo;
    return correspondeBusca && correspondeTipo;
  });

  /* ── CÁLCULO DE LUCRO POR PERÍODO (DIA / SEMANA / MÊS / ANO) ── */
  // Converte data no formato dd/mm/yyyy para um objeto Date
  const parseDataBR = (data: string): Date | null => {
    const partes = data.split('/');
    if (partes.length !== 3) return null;
    const dia = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const ano = Number(partes[2]);
    return new Date(ano, mes, dia);
  };

  const agora = new Date();
  const inicioDoDia = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());

  // Início da semana (segunda-feira)
  const diaSemanaAtual = agora.getDay(); // 0 = domingo
  const deslocamentoSegunda = diaSemanaAtual === 0 ? 6 : diaSemanaAtual - 1;
  const inicioDaSemana = new Date(inicioDoDia);
  inicioDaSemana.setDate(inicioDoDia.getDate() - deslocamentoSegunda);

  const inicioDoMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
  const inicioDoAno = new Date(agora.getFullYear(), 0, 1);

  const somarLucroDesde = (dataLimite: Date) =>
    movimentacoes
      .filter((mov) => mov.tipo === 'saida')
      .reduce((acumulado, mov) => {
        const dataMov = parseDataBR(mov.data);
        if (!dataMov) return acumulado;
        const lucroDaMovimentacao = mov.margemUnitaria * mov.quantidade
        return dataMov >= dataLimite ? acumulado + lucroDaMovimentacao : acumulado
      }, 0);

  const lucroDia = somarLucroDesde(inicioDoDia);
  const lucroSemana = somarLucroDesde(inicioDaSemana);
  const lucroMes = somarLucroDesde(inicioDoMes);
  const lucroAno = somarLucroDesde(inicioDoAno);

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  /* ── SELEÇÃO E EXCLUSÃO DE MOVIMENTAÇÕES ── */

  // Alterna o modo de seleção (exibe/oculta checkboxes na timeline)
  const alternarModoSelecao = () => {
    definirModoSelecao((atual) => !atual);
    definirIdsSelecionados([]);
  };

  // Marca/desmarca uma movimentação individual
  const alternarSelecaoMovimentacao = (id: string) => {
    definirIdsSelecionados((atuais) =>
      atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id]
    );
  };



  const confirmarExclusaoSelecionados = async () => {
    definirExcluindo(true);
    try {
      // Run deletions in parallel for speed; excluirMovimentacao updates UI optimistically
      await Promise.all(idsSelecionados.map((id) => excluirMovimentacao(id)));
    } finally {
      definirExcluindo(false);
    }
    definirIdsSelecionados([]);
    definirExibirModalConfirmarExclusao(false);
    definirModoSelecao(false);
    window.location.reload();
  };



  return (
    <div className="space-y-6 md:space-y-8">

      {/* ── CABEÇALHO DA PÁGINA ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
            Histórico de Movimentações
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Registro cronológico de entradas e saídas de mercadorias no galpão.
          </p>
        </div>
        
        {/* Ações principais no cabeçalho */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={abrirModalEntrada}
            className="flex items-center justify-center gap-1.5 bg-[#006c49] hover:bg-[#005237] text-white font-semibold px-3 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">add_circle</span>
            <span className="hidden sm:inline">Registrar </span><span>Entrada</span>
          </button>
          <button
            onClick={abrirModalSaida}
            className="flex items-center justify-center gap-1.5 bg-[#ba1a1a] hover:bg-[#991515] text-white font-semibold px-3 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">remove_circle</span>
            <span className="hidden sm:inline">Registrar </span><span>Saída</span>
          </button>
          <button
            onClick={() => { definirExibirModalAdicionarLucro(true); definirTemModalAberto(true); }}
            className="flex items-center justify-center gap-1.5 bg-[#0b5f6e] hover:bg-[#094e57] text-white font-semibold px-3 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">attach_money</span>
            <span className="hidden sm:inline">Adicionar </span><span>Lucro</span>
          </button>
        </div>
      </div>

      {/* ── CARDS DE LUCRO POR PERÍODO ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white border border-[#c7c4d8]/40 rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-on-surface-variant opacity-70">
            Lucro Hoje
          </p>
          <p className={`text-lg sm:text-2xl font-extrabold mt-1 ${lucroDia >= 0 ? 'text-[#006c49]' : 'text-[#ba1a1a]'}`}>
            {formatarMoeda(lucroDia)}
          </p>
        </div>
        <div className="bg-white border border-[#c7c4d8]/40 rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-on-surface-variant opacity-70">
            Lucro na Semana
          </p>
          <p className={`text-lg sm:text-2xl font-extrabold mt-1 ${lucroSemana >= 0 ? 'text-[#006c49]' : 'text-[#ba1a1a]'}`}>
            {formatarMoeda(lucroSemana)}
          </p>
        </div>
        <div className="bg-white border border-[#c7c4d8]/40 rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-on-surface-variant opacity-70">
            Lucro no Mês
          </p>
          <p className={`text-lg sm:text-2xl font-extrabold mt-1 ${lucroMes >= 0 ? 'text-[#006c49]' : 'text-[#ba1a1a]'}`}>
            {formatarMoeda(lucroMes)}
          </p>
        </div>
        <div className="bg-white border border-[#c7c4d8]/40 rounded-xl p-3 md:p-4 shadow-sm">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-on-surface-variant opacity-70">
            Lucro no Ano
          </p>
          <p className={`text-lg sm:text-2xl font-extrabold mt-1 ${lucroAno >= 0 ? 'text-[#006c49]' : 'text-[#ba1a1a]'}`}>
            {formatarMoeda(lucroAno)}
          </p>
        </div>
      </div>

      {/* ── FILTROS DA TIMELINE ──
          Mobile: busca em cima + abas embaixo (flex-col)
          Desktop: busca à esquerda + abas à direita (flex-row)
          Oculto quando algum modal está aberto */}
      {!(exibirModalEntrada || exibirModalSaida) && (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#c7c4d8]/40 shadow-sm">

          {/* Lado esquerdo: busca e abas */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1">
            {/* Busca */}
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777587] text-lg">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-[#f5f2ff] border-none rounded-lg text-sm focus:ring-1 focus:ring-[#3525cd] outline-none"
                placeholder="Buscar lote, produto ou conferente..."
                type="text"
                value={busca}
                onChange={(e) => definirBusca(e.target.value)}
              />
            </div>

            {/* Abas */}
            <div className="flex bg-[#f0ecf9] rounded-lg p-1 self-center sm:self-auto">
              {(['todos', 'entrada', 'saida'] as const).map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => definirFiltroTipo(tipo)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                    filtroTipo === tipo
                      ? 'bg-white text-[#3525cd] shadow-sm'
                      : 'text-[#464555] hover:text-[#1b1b24]'
                  }`}
                >
                  {tipo === 'todos' ? 'Todos' : tipo === 'entrada' ? 'Entradas' : 'Saídas'}
                </button>
              ))}
            </div>
          </div>

          {/* Lado direito: ações adicionais */}
          <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 lg:mt-0">
            <button
              onClick={() => exportarMovimentacoesPDF(movimentacoesFiltradas)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-bold border border-[#c7c4d8]/60 bg-white hover:bg-[#f5f2ff] text-on-surface-variant transition-all"
            >
              <span className="material-symbols-outlined text-base">description</span>
              <span>Exportar PDF</span>
            </button>
            <button
              onClick={alternarModoSelecao}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                modoSelecao
                  ? 'bg-[#fff1f2] border-[#f5c2c7] text-[#ba1a1a] hover:bg-[#ffe3e6]'
                  : 'bg-white border-[#c7c4d8]/60 text-on-surface-variant hover:bg-[#f5f2ff]'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {modoSelecao ? 'close' : 'checklist'}
              </span>
              <span>{modoSelecao ? 'Cancelar' : 'Excluir Registros'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          MODAL: ADICIONAR LUCRO MANUAL (INDEPENDENTE)
          ══════════════════════════════════════════════════ */}
      {exibirModalAdicionarLucro && (
        <OverlayModal onClick={(e) => { if (e.target === e.currentTarget) definirExibirModalAdicionarLucro(false); }}>
          <JanelaModal>
            <div className="px-4 md:px-6 py-4 border-b border-[#c7c4d8]/40 flex justify-between items-center bg-[#f5f2ff] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-[#0b5f6e] rounded-full flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-base md:text-lg">attach_money</span>
                </div>
                <h3 className="font-bold text-base md:text-lg text-on-surface">Adicionar Lucro Manual</h3>
              </div>
              <button
                className="p-1 hover:bg-[#eae6f4] rounded-full text-on-surface-variant"
                onClick={() => definirExibirModalAdicionarLucro(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={confirmarAdicionarLucro} className="p-4 md:p-6 space-y-4">
              <CampoTexto
                rotulo="Descrição / Motivo"
                placeholder="Ex: Ajuste caixa, devolução, taxa cartão..."
                value={saidaMotivoLucro}
                onChange={(e) => definirSaidaMotivoLucro(e.target.value)}
              />
              <CampoMonetario
                rotulo="Valor do Produto"
                value={saidaLucroManual}
                onChange={(e) => definirSaidaLucroManual(e.target.value)}
                required
              />

              {/* Taxa editável */}
              <div className="p-3 bg-[#f5f2ff] rounded-xl border border-[#c7c4d8]/40 space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#0b5f6e] rounded"
                    checked={saidaAdicionarJuros}
                    onChange={(e) => definirSaidaAdicionarJuros(e.target.checked)}
                  />
                  <span>Adicionar taxa de serviço</span>
                </label>
                {saidaAdicionarJuros && (
                  <div className="pl-6">
                    <label className="text-xs font-medium text-on-surface-variant">Valor da Taxa</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      className="w-full mt-1 px-3 py-2 text-sm bg-white border border-[#c7c4d8]/60 rounded-lg outline-none"
                      placeholder="0,00"
                      value={taxaManualValor}
                      onChange={(e) => definirTaxaManualValor(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Forma de Pagamento */}
              <div>
                <label className="text-xs font-medium text-on-surface-variant">Forma de Pagamento</label>
                <select
                  className="w-full mt-1 px-3 py-2.5 bg-white border border-[#c7c4d8]/60 rounded-lg text-sm outline-none cursor-pointer focus:ring-1 focus:ring-[#0b5f6e]"
                  value={saidaFormaPagamento}
                  onChange={(e) => definirSaidaFormaPagamento(e.target.value as any)}
                >
                  <option value="especie">Espécie</option>
                  <option value="pix">PIX</option>
                </select>
              </div>

              <div className="flex gap-3 pt-1">
                <BotaoSecundario type="button" className="flex-1" onClick={() => { definirExibirModalAdicionarLucro(false); definirTemModalAberto(false); }}>
                  Cancelar
                </BotaoSecundario>
                <BotaoPrimario type="submit" className="flex-[2]">
                  Confirmar Lucro
                </BotaoPrimario>
              </div>
            </form>
          </JanelaModal>
        </OverlayModal>
      )}

      {/* ── BARRA DE SELEÇÃO (visível em modo de seleção) ── */}
      {modoSelecao && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#fff1f2] border border-[#f5c2c7] rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-on-surface py-1">
            <span>
              {idsSelecionados.length > 0
                ? `${idsSelecionados.length} selecionado(s)`
                : 'Nenhum selecionado'}
            </span>
          </div>
          <button
            type="button"
            disabled={idsSelecionados.length === 0}
            onClick={() => definirExibirModalConfirmarExclusao(true)}
            className="flex items-center justify-center gap-2 bg-[#ba1a1a] hover:bg-[#9e1616] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">delete</span>
            <span>Excluir Selecionados</span>
          </button>
        </div>
      )}

      {/* ── LINHA DO TEMPO (TIMELINE) ──
          Lista cronológica de movimentações filtradas */}
      <section className="bg-white border border-[#c7c4d8]/40 rounded-2xl p-4 md:p-6 shadow-sm">
        <ContainerLinhaTempo>
          {movimentacoesFiltradas.length > 0 ? (
            movimentacoesFiltradas.map((mov) => (
              <ItemLinhaTempo key={mov.id}>

                {/* Linha vertical de conexão entre os itens */}
                <LinhaVertical />

                {/* Checkbox de seleção (modo de exclusão) */}
                {modoSelecao && (
                  <input
                    type="checkbox"
                    checked={idsSelecionados.includes(mov.id)}
                    onChange={() => alternarSelecaoMovimentacao(mov.id)}
                    className="w-4 h-4 mt-1 accent-[#ba1a1a] shrink-0 z-10"
                  />
                )}

                {/* Ícone circular indicando tipo de fluxo */}
                <IconeFluxo $tipo={mov.tipo}>
                  <span className="material-symbols-outlined text-base md:text-xl">
                    {mov.tipo === 'entrada' ? 'download' : 'local_shipping'}
                  </span>
                </IconeFluxo>

                {/* Conteúdo do card de movimentação */}
                <CardMovimentacao>
                  {/* Linha superior: nome do produto + hora + volume */}
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-1.5 gap-0.5 sm:gap-1">
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm md:text-base text-on-surface line-clamp-1">
                        {mov.produtoNome}
                      </h4>
                      <p className="text-xs text-on-surface-variant">
                        Conferente: <span className="font-semibold">{mov.conferente}</span>
                      </p>
                    </div>
                    {/* Data, hora e volume — em mobile fica abaixo do nome */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 mt-1 sm:mt-0">
                      <span className="font-mono text-[10px] md:text-xs text-on-surface-variant whitespace-nowrap">
                        {mov.horario} • {mov.data}
                      </span>
                      <span
                        className={`font-extrabold text-sm md:text-base ${
                          mov.tipo === 'entrada' ? 'text-[#006c49]' : 'text-[#ba1a1a]'
                        }`}
                      >
                        {mov.volume}
                      </span>
                    </div>
                  </div>

                  {/* Linha inferior: badges de lote + operação + total */}
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-1">
                    {/* Badge de lote */}
                    <span className="px-2 py-0.5 bg-[#f5f2ff] text-on-surface-variant text-[9px] md:text-[10px] font-bold rounded font-mono uppercase">
                      Lote: {mov.lote}
                    </span>
                    {/* Badge de operação (Descarga Ambev, Carga Rota 04, etc.) */}
                    <DistintivoFluxo $tipo={mov.tipo}>{mov.operacao}</DistintivoFluxo>
                    {/* Valor total — empurrado para direita com ml-auto */}
                    <span className="text-xs font-bold text-on-surface-variant ml-auto">
                      Total:{' '}
                      {mov.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </CardMovimentacao>
              </ItemLinhaTempo>
            ))
          ) : (
            /* Estado vazio quando nenhuma movimentação corresponde ao filtro */
            <div className="text-center py-10 text-on-surface-variant opacity-60">
              Nenhuma movimentação registrada correspondente aos filtros.
            </div>
          )}
        </ContainerLinhaTempo>
      </section>

      {/* Barra de ações móvel (mantida para compatibilidade quando modal aberto) */}

      {/* ══════════════════════════════════════════════════
          1. MODAL: REGISTRAR ENTRADA DE MERCADORIA
          Bottom sheet em mobile / popup em desktop
          ══════════════════════════════════════════════════ */}
      {exibirModalEntrada && (
        <OverlayModal onClick={(e) => { if (e.target === e.currentTarget) definirExibirModalEntrada(false); }}>
          <JanelaModal>

            {/* Cabeçalho com ícone azul */}
            <div className="px-4 md:px-6 py-4 border-b border-[#c7c4d8]/40 flex justify-between items-center bg-[#f5f2ff] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-[#3525cd] rounded-full flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-base md:text-lg">download</span>
                </div>
                <h3 className="font-bold text-base md:text-lg text-on-surface">Entrada de Mercadoria</h3>
              </div>
              <button
                className="p-1 hover:bg-[#eae6f4] rounded-full text-on-surface-variant"
                onClick={() => definirExibirModalEntrada(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Formulário de Entrada */}
            <form onSubmit={lidarComEntrada} className="p-4 md:p-6 space-y-5 overflow-y-auto">

              {/* Seleção do produto */}
              <CampoSelecao
                rotulo="Produto / Item"
                opcoes={opcoesProdutos}
                value={entradaProdutoId}
                onChange={(e) => atualizarProdutoEntrada(e.target.value)}
                required
              />

              {/* Grid: Quantidade + Custo Unitário */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <CampoNumero
                  rotulo="Quantidade (Unidades)"
                  value={entradaQuantidade}
                  onChange={(e) => definirEntradaQuantidade(e.target.value)}
                  min={1}
                  required
                />
                <CampoMonetario
                  rotulo="Preço Custo Unidade (NF)"
                  value={entradaCustoUnitario}
                  onChange={(e) => definirEntradaCustoUnitario(e.target.value)}
                  required
                />
              </div>

              {/* Conferente responsável */}
              <CampoTexto
                rotulo="Nome do Conferente / Operador"
                placeholder="Ex: Marcos V."
                value={entradaConferente}
                onChange={(e) => definirEntradaConferente(e.target.value)}
                required
              />

              {/* Aviso de conferência física */}
              <div className="p-3 md:p-4 bg-[#f5f2ff] rounded-xl border border-[#3525cd]/10 flex gap-3">
                <span className="material-symbols-outlined text-[#3525cd] shrink-0 text-lg">info</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Confira fisicamente o lote, integridade das caixas/latas e a data de validade
                  dos produtos antes de dar baixa na nota fiscal.
                </p>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3 pt-1">
                <BotaoSecundario type="button" className="flex-1" onClick={() => {
                  definirExibirModalEntrada(false);
                  definirTemModalAberto(false);
                }}>
                  Cancelar
                </BotaoSecundario>
                <BotaoPrimario type="submit" className="flex-[2]">
                  Confirmar Entrada
                </BotaoPrimario>
              </div>
            </form>
          </JanelaModal>
        </OverlayModal>
      )}

      {/* ══════════════════════════════════════════════════
          2. MODAL: REGISTRAR SAÍDA / EXPEDIÇÃO
          Bottom sheet em mobile / popup em desktop
          ══════════════════════════════════════════════════ */}
      {exibirModalSaida && (
        <OverlayModal onClick={(e) => { if (e.target === e.currentTarget) definirExibirModalSaida(false); }}>
          <JanelaModal>

            {/* Cabeçalho com ícone verde */}
            <div className="px-4 md:px-6 py-4 border-b border-[#c7c4d8]/40 flex justify-between items-center bg-[#f5f2ff] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-[#006c49] rounded-full flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-base md:text-lg">local_shipping</span>
                </div>
                <h3 className="font-bold text-base md:text-lg text-on-surface">Registrar Saída / Expedição</h3>
              </div>
              <button
                className="p-1 hover:bg-[#eae6f4] rounded-full text-on-surface-variant"
                onClick={() => definirExibirModalSaida(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Formulário de Saída */}
            <form onSubmit={lidarComSaida} className="p-4 md:p-6 space-y-5 overflow-y-auto">

              {/* Seleção do produto */}
              <CampoSelecao
                rotulo="Produto / Item"
                opcoes={opcoesProdutos}
                value={saidaProdutoId}
                onChange={(e) => atualizarProdutoSaida(e.target.value)}
                required
              />

              {/* Grid: Quantidade + Preço de Venda */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <CampoNumero
                  rotulo="Quantidade"
                  value={saidaQuantidade}
                  onChange={(e) => definirSaidaQuantidade(e.target.value)}
                  min={1}
                  required
                />
                <CampoMonetario
                  rotulo="Preço de Venda Unitário"
                  value={saidaPrecoVenda}
                  onChange={(e) => definirSaidaPrecoVenda(e.target.value)}
                  required
                />
              </div>

              {/* Botão para abrir formulário opcional de adicionar lucro */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => definirMostrarAdicionarLucro((s) => !s)}
                  className="px-3 py-2 bg-[#f3f4f6] rounded-md text-sm border"
                >
                  {mostrarAdicionarLucro ? 'Ocultar Adicionar Lucro' : 'Adicionar Lucro'}
                </button>
              </div>

              {mostrarAdicionarLucro && (
                <div className="space-y-3">
                  <CampoTexto
                    rotulo="Descrição / Motivo"
                    placeholder="Ex: Ajuste comercial, taxa cartão..."
                    value={saidaMotivoLucro}
                    onChange={(e) => definirSaidaMotivoLucro(e.target.value)}
                  />
                  <div className="space-y-2">
                    <CampoMonetario
                      rotulo="Lucro Manual (por unidade)"
                      value={saidaLucroManual}
                      onChange={(e) => definirSaidaLucroManual(e.target.value)}
                    />
                    <div className="p-3 bg-[#f5f2ff] rounded-xl border border-[#c7c4d8]/40 space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[#006c49]"
                          checked={saidaAdicionarJuros}
                          onChange={(e) => definirSaidaAdicionarJuros(e.target.checked)}
                        />
                        <span>Adicionar taxa de serviço</span>
                      </label>
                      {saidaAdicionarJuros && (
                        <div className="pl-6">
                          <label className="text-xs font-medium text-on-surface-variant">Valor da Taxa</label>
                          <input
                            type="text"
                            inputMode="decimal"
                            className="w-full mt-1 px-3 py-2 text-sm bg-white border border-[#c7c4d8]/60 rounded-lg outline-none"
                            placeholder="0,00"
                            value={saidaValorTaxa}
                            onChange={(e) => definirSaidaValorTaxa(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Card de margem calculada dinamicamente */}
              <div className="p-3 md:p-4 bg-[#f5f2ff] rounded-xl border border-[#c7c4d8]/40 flex items-center gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-[#006c49]/10 text-[#006c49] rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg md:text-xl">calculate</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] md:text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    Margem Bruta Estimada
                  </p>
                  <p className="text-xs text-on-surface line-clamp-1">
                    Com base no custo do lote:{' '}
                    <span className="font-semibold">
                      {custoUnitarioSaida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </p>
                  <p className={`font-black text-sm mt-0.5 ${margemEstimadaTotalComAjustes >= 0 ? 'text-[#006c49]' : 'text-[#ba1a1a]'}`}>
                    Lucro Estimado:{' '}
                    {margemEstimadaTotalComAjustes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3 pt-1">
                <BotaoSecundario type="button" className="flex-1" onClick={() => {
                  definirExibirModalSaida(false);
                  definirTemModalAberto(false);
                }}>
                  Cancelar
                </BotaoSecundario>
                <BotaoPrimario
                  type="submit"
                  className="flex-[2]"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  Confirmar Expedição
                </BotaoPrimario>
              </div>
            </form>
          </JanelaModal>
        </OverlayModal>
      )}

      {/* ══════════════════════════════════════════════════
          3. MODAL: CONFIRMAR EXCLUSÃO DE MOVIMENTAÇÕES
          ══════════════════════════════════════════════════ */}
      {exibirModalConfirmarExclusao && (
        <OverlayModal onClick={(e) => { if (e.target === e.currentTarget && !excluindo) definirExibirModalConfirmarExclusao(false); }}>
          <JanelaModal style={{ maxWidth: '440px' }}>
            {/* Cabeçalho do modal */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-2 pb-4 border-b border-[#c7c4d8]/40 p-4 md:p-6">
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
                  onClick={() => !excluindo && definirExibirModalConfirmarExclusao(false)}
                  className="text-[#464555] hover:bg-[#f5f2ff] rounded-full p-1 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Corpo do modal */}
            <div className="py-6 px-4 md:px-6 text-center">
              <p className="text-[#464555] text-sm leading-relaxed">
                Tem certeza que deseja excluir{' '}
                <span className="font-semibold text-on-surface">
                  {idsSelecionados.length} registro(s)
                </span>{' '}
                de movimentação? Esta ação não pode ser desfeita.
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 p-4 md:p-6">
              <BotaoSecundario
                type="button"
                className="w-full"
                disabled={excluindo}
                onClick={() => definirExibirModalConfirmarExclusao(false)}
              >
                Cancelar
              </BotaoSecundario>
              <div className="w-full">
                <button
                  disabled={excluindo}
                  onClick={confirmarExclusaoSelecionados}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#ba1a1a] hover:bg-[#9e1616] disabled:opacity-60 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all"
                >
                  <span className="material-symbols-outlined">delete</span>
                  <span>{excluindo ? 'Excluindo...' : 'Excluir Registros'}</span>
                </button>
              </div>
            </div>
          </JanelaModal>
        </OverlayModal>
      )}
    </div>
  );
};