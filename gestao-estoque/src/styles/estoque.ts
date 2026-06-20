import styled from 'styled-components';

/* ============================================================
   ESTILOS DA PÁGINA DE ESTOQUE (TABELA + MODAIS)
   Inclui suporte a responsividade mobile-first.
   Breakpoints:
     - Mobile:  < 640px
     - Tablet:  640px–1024px
     - Desktop: > 1024px
   ============================================================ */

/* Wrapper da tabela com overflow-x para scroll horizontal em mobile */
export const ContainerTabela = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 0.75rem;
  border: 1px solid var(--color-outline-variant);
  background-color: var(--color-surface-container-lowest);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

/* Tabela principal */
export const TabelaDados = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  text-align: left;
`;

/* Linha do cabeçalho */
export const LinhaCabecalho = styled.tr`
  border-bottom: 1px solid var(--color-outline-variant);
  background-color: var(--color-surface-container-low);
`;

/* Célula do cabeçalho */
export const CelulaCabecalho = styled.th`
  padding: clamp(0.5rem, 2vw, 1rem) clamp(0.625rem, 2vw, 1.5rem);
  font-size: clamp(0.65rem, 2vw, 0.875rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);

  @media (max-width: 430px) {
    padding: 0.5rem 0.625rem;
    font-size: 0.65rem;
  }
`;

/* Linha de dados */
export const LinhaDados = styled.tr`
  border-bottom: 1px solid rgba(199, 196, 216, 0.3);
  transition: background-color 0.15s ease-in-out;

  &:nth-child(odd) {
    background-color: var(--color-surface-container-lowest);
  }

  &:nth-child(even) {
    background-color: var(--color-surface-container-low);
  }

  &:hover {
    background-color: var(--color-surface-container);
  }
`;

/* Célula de dados */
export const CelulaDados = styled.td`
  padding: clamp(0.5rem, 2vw, 1rem) clamp(0.625rem, 2vw, 1.5rem);
  font-size: clamp(0.8125rem, 2.5vw, 0.9375rem);
  color: var(--color-on-surface);
  vertical-align: middle;

  @media (max-width: 430px) {
    padding: 0.625rem 0.625rem;
    font-size: 0.8125rem;
  }
`;

/* Container da barra de progresso */
export const ContainerBarraProgresso = styled.div`
  width: 100%;
  max-width: clamp(80px, 20vw, 160px);
  height: 6px;
  background-color: var(--color-surface-container-highest);
  border-radius: 9999px;
  overflow: hidden;

  @media (max-width: 430px) {
    max-width: 80px;
  }
`;

/* Preenchimento colorido da barra de progresso
   $porcentagem: 0–100 | $cor: 'erro' | 'alerta' | 'sucesso' */
export const PreenchimentoProgresso = styled.div<{
  $porcentagem: number;
  $cor: 'erro' | 'alerta' | 'sucesso';
}>`
  height: 100%;
  width: ${props => Math.min(100, Math.max(0, props.$porcentagem))}%;
  background-color: ${props => {
    if (props.$cor === 'erro') return 'var(--color-error)';
    if (props.$cor === 'alerta') return '#ffb695'; /* Tom laranja de alerta */
    return 'var(--color-secondary)';
  }};
  border-radius: 9999px;
  transition: width 0.5s ease;
`;

/* Badge de status do nível de estoque (Crítico / Alerta / Estável / Alto) */
export const BadgeStatus = styled.span<{
  $status: 'critico' | 'alerta' | 'estavel' | 'alto';
}>`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.625rem; /* 10px */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap; /* Evita quebra de linha */

  /* Cor de fundo por status */
  background-color: ${props => {
    if (props.$status === 'critico') return 'var(--color-error-container)';
    if (props.$status === 'alerta') return 'rgba(255, 219, 204, 0.4)';
    return 'rgba(111, 251, 190, 0.2)';
  }};

  /* Cor do texto por status */
  color: ${props => {
    if (props.$status === 'critico') return 'var(--color-error)';
    if (props.$status === 'alerta') return 'var(--color-tertiary)';
    return 'var(--color-secondary)';
  }};

  /* Borda sutil por status */
  border: 1px solid ${props => {
    if (props.$status === 'critico') return 'rgba(186, 26, 26, 0.2)';
    if (props.$status === 'alerta') return 'rgba(126, 48, 0, 0.2)';
    return 'rgba(0, 108, 73, 0.2)';
  }};
`;

/* Overlay escuro e desfocado do Modal (fundo de tela inteira) */
export const OverlayModal = styled.div`
  position: fixed;
  inset: 0; /* top/right/bottom/left = 0 */
  z-index: 100;
  display: flex;
  align-items: flex-end; /* Em mobile: modal sobe do rodapé */
  justify-content: center;
  padding: 0; /* Sem padding em mobile — ocupa toda a largura */
  background-color: rgba(27, 27, 36, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: modalEntrada 0.25s ease-out forwards;
  /* Suporte correto a safe areas no iOS */
  padding-bottom: env(safe-area-inset-bottom);

  /* Em tablet e acima: modal centralizado verticalmente */
  @media (min-width: 640px) {
    align-items: center;
    padding: 1rem;
    padding-bottom: 1rem;
  }

  @keyframes modalEntrada {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;


/* Janela do Modal — em mobile sobe do rodapé, em desktop é centralizada */
export const JanelaModal = styled.div`
  width: 100%;
  max-width: 100%; /* Ocupa tela toda em mobile */
  /* Usa dvh para calcular corretamente no Safari iOS */
  max-height: 92dvh;
  max-height: 92vh; /* fallback */
  overflow-y: auto; /* Scroll interno se o conteúdo for muito longo */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  background-color: var(--color-surface-container-lowest);
  border-radius: 1.5rem 1.5rem 0 0; /* Cantos arredondados só em cima (sheet style) */
  border: 1px solid var(--color-outline-variant);
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  animation: modalSurgirMobile 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  /* Espaço extra para a barra de home do iPhone */
  padding-bottom: env(safe-area-inset-bottom);

  /* Em tablet e acima: estilo de popup centralizado */
  @media (min-width: 640px) {
    max-width: 32rem;
    max-height: 90dvh;
    max-height: 90vh; /* fallback */
    border-radius: 1.25rem;
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15),
                0 10px 10px -5px rgba(0, 0, 0, 0.06);
    animation: modalSurgirDesktop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    padding-bottom: 0;
  }

  /* Animação: desliza de baixo para cima em mobile */
  @keyframes modalSurgirMobile {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Animação: escala suave em desktop */
  @keyframes modalSurgirDesktop {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;


/* Seção de formulário — layout em coluna com espaçamento entre campos */
export const SecaoFormulario = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
