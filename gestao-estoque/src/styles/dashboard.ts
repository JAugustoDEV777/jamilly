import styled from 'styled-components';

/* ============================================================
   ESTILOS DO PAINEL DE CONTROLE (DASHBOARD)
   Referência de breakpoints:
     - Mobile:  < 640px  (sm)
     - Tablet:  640px–1024px  (md/lg)
     - Desktop: > 1024px (xl)
   ============================================================ */

/* Container em grade bento de 12 colunas para os cards de métricas */
export const ContainerPainel = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(0.75rem, 2vw, 1.5rem);
  width: 100%;
`;

/* Card individual de métricas rápidas */
export const CardMetrica = styled.div<{ $tipoBorda?: 'erro' | 'padrao' }>`
  background-color: var(--color-surface-container-lowest);
  border: 1px solid var(--color-outline-variant);
  border-left: ${props =>
    props.$tipoBorda === 'erro'
      ? '4px solid var(--color-error)'
      : '1px solid var(--color-outline-variant)'};
  border-radius: 1rem;
  padding: clamp(0.875rem, 3vw, 1.5rem);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  }

  /* Dark mode */
  background-color: var(--color-surface-container-lowest);
`;

/* Rótulo superior em maiúsculas */
export const RotuloCard = styled.p`
  font-size: clamp(0.625rem, 2vw, 0.875rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
  opacity: 0.8;
  margin: 0 0 0.5rem 0;
`;

/* Valor numérico em destaque */
export const ValorCard = styled.h3<{ $corValor?: 'erro' | 'sucesso' | 'padrao' }>`
  font-size: clamp(1.25rem, 5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: ${props => {
    if (props.$corValor === 'erro') return 'var(--color-error)';
    if (props.$corValor === 'sucesso') return 'var(--color-secondary)';
    return 'var(--color-on-surface)';
  }};
`;

/* Indicador de tendência */
export const IndicadorTendencia = styled.div<{ $tipoTendencia?: 'alta' | 'baixa' | 'neutro' }>`
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: clamp(0.75rem, 2.5vw, 0.9375rem);
  font-weight: 500;
  color: ${props => {
    if (props.$tipoTendencia === 'alta') return 'var(--color-secondary)';
    if (props.$tipoTendencia === 'baixa') return 'var(--color-error)';
    return 'var(--color-on-surface-variant)';
  }};
`;

/* Card do gráfico de barras semanal */
export const CardGrafico = styled.div`
  background-color: var(--color-surface-container-lowest);
  border: 1px solid var(--color-outline-variant);
  border-radius: 1rem;
  padding: 1.25rem; /* Padding reduzido em mobile */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

/* Barra individual do gráfico com animação de crescimento por porcentagem
   $alturaPorcentagem: número de 0 a 100 representando a altura relativa */
export const BarraGrafico = styled.div<{ $alturaPorcentagem: number }>`
  width: 100%;
  background-color: var(--color-primary);
  opacity: ${props => (props.$alturaPorcentagem / 100) * 0.7 + 0.3};
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  height: ${props => props.$alturaPorcentagem}%;
  transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;
