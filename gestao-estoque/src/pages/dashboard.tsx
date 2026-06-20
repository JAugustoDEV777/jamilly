import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEstoque } from '../context/EstoqueContext';
import {
  ContainerPainel,
  CardMetrica,
  RotuloCard,
  ValorCard,
  IndicadorTendencia,
  CardGrafico,
  BarraGrafico,
} from '../styles/dashboard';

/* ============================================================
   PAINEL DE CONTROLE (DASHBOARD)
   Exibe métricas em tempo real do estoque, gráfico de giro
   de mercadorias e feed das últimas movimentações.
   ============================================================ */

export const Dashboard: React.FC = () => {
  const { produtos, movimentacoes } = useEstoque();
  const navegar = useNavigate();

  /* ── 1. CÁLCULOS DAS MÉTRICAS DINÂMICAS ── */

  // Quantidade total de SKUs cadastrados no catálogo
  const totalSkus = produtos.length;

  // Somatório do valor de compra de todo o inventário atual
  const valorTotalEstoque = produtos.reduce(
    (acumulado, item) => acumulado + item.precoCusto * item.quantidade,
    0
  );

  // Itens abaixo do estoque mínimo definido (situação crítica)
  const produtosCriticos = produtos.filter(
    (item) => item.quantidade < item.estoqueMinimo
  ).length;

  // Faturamento das saídas registradas na data de hoje
  const hoje = new Date().toLocaleDateString('pt-BR')
  const faturamentoDiario = movimentacoes
    .filter((mov) => mov.tipo === 'saida' && mov.data === hoje)
    .reduce((acumulado, mov) => acumulado + mov.valorTotal, 0);

  // Formata número para moeda BRL (R$ 1.234,56)
  const formatarMoeda = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Formata valores muito grandes com abreviação compacta
  const formatarMoedaAbreviada = (valor: number) => {
    if (Math.abs(valor) >= 1000000) {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
      });
    }
    return formatarMoeda(valor);
  };

  // Exibe apenas as 4 movimentações mais recentes no feed lateral
  const ultimasMovimentacoes = movimentacoes.slice(0, 4);

  /* ── 2. RENDERIZAÇÃO DA PÁGINA ── */
  return (
    <div className="space-y-6 md:space-y-8">

      {/* ── CABEÇALHO DA PÁGINA ──
          Em mobile: título e botão empilhados (flex-col)
          Em desktop: lado a lado (flex-row) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
            Painel de Controle
          </h1>
          <p className="text-on-surface-variant mt-1 text-sm">
            Resumo operacional e métricas de desempenho do depósito.
          </p>
        </div>

        {/* Botão de ação rápida — leva para a tela de movimentações */}
        <button
          onClick={() => navegar('/movimentacoes')}
          className="flex items-center gap-2 bg-[#3525cd] hover:bg-[#4d44e3] text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Registrar Movimento</span>
        </button>
      </div>

      {/* ── GRID DE MÉTRICAS RÁPIDAS (4 CARDS) ──
          Mobile: 1 coluna (col-span-12)
          Tablet: 2 colunas (col-span-6)
          Desktop: 4 colunas (col-span-3) */}
      <ContainerPainel>

        {/* Card 1: Faturamento Diário (mesma aparência do Valor total de produtos) */}
        <CardMetrica className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div>
            <RotuloCard>Faturamento Diário</RotuloCard>
            <ValorCard>{formatarMoedaAbreviada(faturamentoDiario)}</ValorCard>
            <IndicadorTendencia>
              <span className="material-symbols-outlined text-lg mr-1">trending_up</span>
              <span>Em relação a Hoje</span>
            </IndicadorTendencia>
          </div>
        </CardMetrica>

        {/* Card 2: Total de IDs cadastrados */}
        <CardMetrica className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div>
            <RotuloCard>Total de produtos</RotuloCard>
            <ValorCard>{totalSkus}</ValorCard>
            <IndicadorTendencia>
              <span className="material-symbols-outlined text-lg mr-1">inventory</span>
              <span>Produtos</span>
            </IndicadorTendencia>
          </div>
        </CardMetrica>

        {/* Card 3: Valor total do inventário em gôndola */}
        <CardMetrica className="col-span-12 sm:col-span-6 lg:col-span-3">
          <div>
            <RotuloCard>Valor total de produtos</RotuloCard>
            <ValorCard>{formatarMoedaAbreviada(valorTotalEstoque)}</ValorCard>
            <IndicadorTendencia>
              <span className="material-symbols-outlined text-lg mr-1">payments</span>
              <span>Valor de compra estimado</span>
            </IndicadorTendencia>
          </div>
        </CardMetrica>

        {/* Card 4: Alertas de ruptura de estoque
            Borda vermelha quando há produtos críticos */}
        <CardMetrica
          className="col-span-12 sm:col-span-6 lg:col-span-3"
          $tipoBorda={produtosCriticos > 0 ? 'erro' : 'padrao'}
        >
          <div>
            <RotuloCard>Estoque Crítico</RotuloCard>
            <ValorCard $corValor={produtosCriticos > 0 ? 'erro' : 'padrao'}>
              {produtosCriticos}
            </ValorCard>
            <IndicadorTendencia $tipoTendencia={produtosCriticos > 0 ? 'baixa' : 'neutro'}>
              <span className="material-symbols-outlined text-lg mr-1">
                {produtosCriticos > 0 ? 'warning' : 'check_circle'}
              </span>
              <span>
                {produtosCriticos > 0
                  ? 'Produtos Críticos'
                  : 'Níveis de estoque estáveis'}
              </span>
            </IndicadorTendencia>
          </div>
        </CardMetrica>
      </ContainerPainel>

      {/* ── SEÇÃO INFERIOR: GRÁFICO + FEED DE ATIVIDADES ──
          Mobile: empilhados (grid 1 coluna)
          Desktop: lado a lado (7 + 5 colunas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">

        {/* Gráfico de Barras — Giro semanal de mercadorias */}
        <CardGrafico className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h3 className="text-base md:text-lg font-bold text-on-surface">Giro de Mercadorias</h3>
            <p className="text-sm text-on-surface-variant opacity-60">
              Volume estimado de saídas por dia da semana
            </p>
          </div>

          {/* Barras do gráfico — alturas relativas a valores da semana */}
          <div className="h-40 sm:h-52 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-4 mt-6 md:mt-8">
            {/* Cada coluna representa um dia da semana */}
            {(() => {
              // Agrupa movimentações por dia da semana (SEG..DOM) usando `quantidade`
              const labels = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM']
              const totals = new Array(7).fill(0)

              movimentacoes.forEach((mov) => {
                // mov.data vem no formato dd/mm/yyyy
                const parts = mov.data.split('/')
                if (parts.length !== 3) return
                const day = Number(parts[0])
                const month = Number(parts[1]) - 1
                const year = Number(parts[2])
                const d = new Date(year, month, day)
                // getDay: 0 (DOM) .. 6 (SAB). Map to index 0 (SEG) .. 6 (DOM)
                const jsDay = d.getDay()
                const index = jsDay === 0 ? 6 : jsDay - 1
                totals[index] += mov.quantidade
              })

              const max = Math.max(...totals, 1)

              return labels.map((dia, idx) => {
                const value = totals[idx]
                const altura = Math.round((value / max) * 100)
                return (
                  <div key={dia} className="flex flex-col items-center gap-1 sm:gap-2 w-full h-full justify-end">
                    <span className="text-[8px] sm:text-[9px] font-bold text-on-surface-variant mb-1">{value}</span>
                    <BarraGrafico $alturaPorcentagem={Math.max(6, altura)} />
                    <span className="text-[9px] sm:text-xs text-on-surface-variant font-semibold">{dia}</span>
                  </div>
                )
              })
            })()}
          </div>
        </CardGrafico>

        {/* Feed de últimas atividades — movimentações recentes */}
        <div className="lg:col-span-5 bg-white border border-[#c7c4d8]/40 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col justify-between">
          <div>
            {/* Cabeçalho do feed */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-bold text-on-surface">Últimas Atividades</h3>
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#eae6f4] rounded-lg text-[#3525cd]">
                Histórico Recente
              </span>
            </div>

            {/* Lista de movimentações recentes */}
            <div className="space-y-2 md:space-y-4">
              {ultimasMovimentacoes.map((mov) => (
                <div
                  key={mov.id}
                  className="flex items-center justify-between p-2.5 md:p-3.5 hover:bg-[#f5f2ff] rounded-xl transition-colors"
                >
                  {/* Ícone + info do produto */}
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <span
                      className={`material-symbols-outlined p-1.5 md:p-2 rounded-xl text-base md:text-lg shrink-0 ${
                        mov.tipo === 'entrada'
                          ? 'bg-[#6cf8bb]/20 text-[#006c49]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {mov.tipo === 'entrada' ? 'login' : 'logout'}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs md:text-sm text-on-surface line-clamp-1">
                        {mov.produtoNome}
                      </h4>
                      <p className="text-xs text-on-surface-variant truncate">
                        {mov.operacao} • {mov.horario}
                      </p>
                    </div>
                  </div>

                  {/* Volume e lote */}
                  <div className="text-right shrink-0 ml-2">
                    <span
                      className={`font-bold text-xs md:text-sm ${
                        mov.tipo === 'entrada' ? 'text-[#006c49]' : 'text-[#ba1a1a]'
                      }`}
                    >
                      {mov.volume}
                    </span>
                    <p className="text-[9px] md:text-[10px] text-[#464555]/60 font-mono">{mov.lote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão para ver o histórico completo */}
          <button
            onClick={() => navegar('/movimentacoes')}
            className="w-full mt-4 md:mt-6 py-2.5 md:py-3 hover:bg-[#3525cd]/5 text-[#3525cd] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 border border-[#3525cd]/10"
          >
            <span>Ver movimentações completas</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
