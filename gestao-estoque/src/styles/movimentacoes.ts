import styled from 'styled-components';

/* ============================================================
   ESTILOS DA PÁGINA DE MOVIMENTAÇÕES (TIMELINE + BARRA FLUTUANTE)
   Breakpoints:
     - Mobile:  < 640px
     - Tablet:  640px–1024px
     - Desktop: > 1024px
   ============================================================ */

/* Container geral da linha do tempo */
export const ContainerLinhaTempo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

/* Linha vertical que conecta os itens da timeline */
export const LinhaVertical = styled.div`
  position: absolute;
  left: 1.2rem; /* Alinhada ao centro do ícone circular */
  top: 1.5rem;
  bottom: -1.5rem;
  width: 2px;
  background-color: var(--color-outline-variant);
  opacity: 0.5;
  z-index: 0;
`;

/* Item individual da timeline */
export const ItemLinhaTempo = styled.div`
  display: flex;
  gap: 0.5rem; /* Espaço menor entre ícone e conteúdo em mobile */
  padding: 0.625rem; /* Padding compacto em mobile */
  position: relative;
  transition: background-color 0.2s ease;
  border-radius: 1rem;

  /* Mais espaço em telas maiores */
  @media (min-width: 640px) {
    gap: 0.75rem;
    padding: 0.875rem;
  }

  @media (min-width: 1024px) {
    gap: 1rem;
    padding: 1.25rem;
  }

  /* Destaque de linha ao hover */
  &:hover {
    background-color: var(--color-surface-container-low);
  }

  /* Oculta a linha vertical no último item do grupo */
  &:last-child ${LinhaVertical} {
    display: none;
  }
`;

/* Ícone circular indicador de fluxo (entrada = azul, saída = verde) */
export const IconeFluxo = styled.div<{ $tipo: 'entrada' | 'saida' }>`
  width: 2rem; /* Ligeiramente menor em mobile */
  height: 2rem;
  min-width: 2rem; /* Evita que o ícone encolha com flex */
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.9rem; /* Ícone menor em mobile */

  /* Entrada = azul primário | Saída = verde secundário */
  background-color: ${props =>
    props.$tipo === 'entrada'
      ? 'var(--color-primary-container)'
      : 'var(--color-secondary-container)'};
  color: ${props =>
    props.$tipo === 'entrada'
      ? 'var(--color-on-primary)'
      : 'var(--color-on-secondary-container)'};

  @media (min-width: 640px) {
    width: 2.25rem;
    height: 2.25rem;
    min-width: 2.25rem;
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    font-size: 1.25rem;
  }
`;

/* Área de conteúdo do card de movimentação */
export const CardMovimentacao = styled.div`
  flex: 1;
  min-width: 0; /* Evita overflow de texto — crítico para mobile */
  display: flex;
  flex-direction: column;
`;

/* Badge de tipo de operação (Descarga Ambev, Carga Rota, etc.) */
export const DistintivoFluxo = styled.span<{ $tipo: 'entrada' | 'saida' }>`
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem; /* 10px */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  white-space: nowrap;

  /* Entrada = roxo/primário | Saída = verde/secundário */
  background-color: ${props =>
    props.$tipo === 'entrada' ? 'rgba(79, 70, 229, 0.1)' : 'rgba(0, 108, 73, 0.1)'};
  color: ${props =>
    props.$tipo === 'entrada' ? 'var(--color-primary)' : 'var(--color-secondary)'};
  border: 1px solid ${props =>
    props.$tipo === 'entrada' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(0, 108, 73, 0.2)'};
`;

/* =====================================================
   BARRA DE AÇÕES FLUTUANTE
   Em mobile: fica acima da barra de navegação inferior.
   Em desktop: posicionada no centro do rodapé da tela.
   ===================================================== */
export const BarraAcoesFlutuante = styled.div<{ $inline?: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.375rem; /* Espaçamento reduzido em mobile */
  padding: 0.5rem 0.75rem; /* Padding compacto em mobile */
  border-radius: 9999px;
  z-index: 49; /* Abaixo do z-index 50 da navbar */
  width: max-content;
  max-width: calc(100vw - 2rem); /* Nunca ultrapassa a largura da tela */

  /* Modo inline: quando a barra é exibida logo abaixo da busca
     usamos um visual leve e sem posicionamento fixo para combinar
     com o card de filtros. */
  ${(p) =>
    p.$inline
      ? `position: static; transform: none; left: auto; bottom: auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); justify-items: stretch; align-items: center; background: rgba(245, 242, 255, 0.85); color: var(--color-on-surface); box-shadow: none; border: 1px solid rgba(199, 196, 216, 0.25); padding: 0.625rem; gap: 0.5rem; width: 100%; max-width: none; margin-top: 0.5rem; border-radius: 1.5rem;`
      : `position: fixed; bottom: 4rem; left: 50%; transform: translateX(-50%); background-color: var(--color-on-surface); color: var(--color-background); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);`}

  /* Em desktop: ajuste de espaçamento quando flutuante */
  @media (min-width: 769px) {
    ${(p) =>
      p.$inline
        ? `gap: 0.75rem; padding: 0; margin-top: 0.5rem; justify-content: flex-end;`
        : `bottom: 2rem; gap: 0.75rem; padding: 0.625rem 1.25rem; max-width: none;`}
  }

  @media (min-width: 1024px) {
    ${(p) =>
      p.$inline
        ? `gap: 1rem; padding: 0; margin-top: 0.5rem; justify-content: flex-end;`
        : `bottom: 2rem; gap: 1rem; padding: 0.75rem 1.5rem; max-width: none;`}
  }
`;

/* Botão de ação dentro da barra flutuante */
export const BotaoBarraAcao = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem; /* Espaço menor em mobile */
  padding: 0.6rem 0.8rem;
  background-color: rgba(245, 242, 255, 0.95);
  color: var(--color-on-surface);
  border: 1px solid rgba(199, 196, 216, 0.85);
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 9999px;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-height: 42px;
  width: 100%;
  min-width: 0;
  text-align: center;

  @media (min-width: 640px) {
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    min-height: auto;
    width: auto;
  }

  /* Fundo leve ao hover */
  &:hover {
    background-color: rgba(241, 237, 255, 1);
    border-color: rgba(199, 196, 216, 1);
  }

  /* Feedback de clique */
  &:active {
    transform: scale(0.98);
  }
`;

/* Separador vertical entre itens da barra flutuante */
export const DivisorBarraAcao = styled.div`
  width: 1px;
  height: 1.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
`;

/* Botões-pílula usados na área de ações (desktop) */
export const ActionPill = styled.button<{ $variant?: 'default' | 'success' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.875rem;
  border: 1px solid transparent;
  cursor: pointer;
  background-color: ${(p) =>
    p.$variant === 'success' ? 'rgba(11,111,74,0.06)' : p.$variant === 'danger' ? 'rgba(186,26,26,0.04)' : 'transparent'};
  color: ${(p) => (p.$variant === 'danger' ? 'var(--color-error)' : p.$variant === 'success' ? '#0b6f4a' : 'inherit')};
  transition: all 0.18s ease;

  &:hover {
    background-color: ${(p) => (p.$variant === 'success' ? 'rgba(11,111,74,0.09)' : p.$variant === 'danger' ? 'rgba(186,26,26,0.08)' : 'rgba(0,0,0,0.04)')};
    transform: translateY(-1px);
  }

  &:active { transform: translateY(0); }
`;
