import React from 'react';
import styled from 'styled-components';

/* ============================================================
   COMPONENTES DE BOTÃO DO SISTEMA
   Todos os botões respeitam área de toque mínima recomendada
   de 44x44px para uso confortável em dispositivos touch.
   ============================================================ */

/* Base compartilhada por todos os botões — reset + animações */
const BotaoBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  font-family: inherit; /* Herda a fonte Inter do body */
  border-radius: 0.5rem;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  /* Área de toque mínima recomendada para mobile (WCAG 2.5.5) */
  min-height: 40px;
  white-space: nowrap; /* Evita quebra de texto dentro do botão */

  /* Animação de "pressionar" ao clicar — feedback tátil visual */
  &:active {
    transform: scale(0.96);
  }

  /* Estado desabilitado: opacidade reduzida e cursor proibido */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

/* ─────────────────────────────────────────
   BOTÃO PRIMÁRIO — Ação principal da tela
   Cor: roxo/índigo da marca (#3525cd)
   Uso: "Salvar Produto", "Confirmar Entrada"
   ───────────────────────────────────────── */
const BotaoPrimarioEstilizado = styled(BotaoBase)`
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border: 1px solid transparent;
  padding: 0.5rem 1rem; /* Compacto em mobile */
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);

  /* Padding maior em desktop */
  @media (min-width: 640px) {
    padding: 0.625rem 1.25rem;
  }

  /* Hover: fundo levemente mais claro + sombra aumentada */
  &:hover:not(:disabled) {
    background-color: var(--color-primary-container);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
  }
`;

/* ─────────────────────────────────────────
   BOTÃO SECUNDÁRIO — Ação alternativa / cancelar
   Visual: contorno sutil, sem preenchimento
   Uso: "Cancelar", ações destrutivas secundárias
   ───────────────────────────────────────── */
const BotaoSecundarioEstilizado = styled(BotaoBase)`
  background-color: var(--color-surface-container-lowest);
  color: var(--color-on-surface-variant);
  border: 1px solid var(--color-outline-variant);
  padding: 0.5rem 1rem;

  @media (min-width: 640px) {
    padding: 0.625rem 1.25rem;
  }

  /* Hover: fundo levemente acinzentado */
  &:hover:not(:disabled) {
    background-color: var(--color-surface-container-low);
    color: var(--color-on-surface);
  }
`;

/* ─────────────────────────────────────────
   BOTÃO EXCLUIR — Ação destrutiva (vermelho)
   Visual: ícone circular com borda vermelha
   Uso: Excluir produto da tabela
   ───────────────────────────────────────── */
const BotaoExcluirEstilizado = styled(BotaoBase)`
  background-color: transparent;
  color: var(--color-error);
  border: 1px solid rgba(186, 26, 26, 0.2);
  /* Circular com padding uniforme para ícone */
  padding: 0.375rem; /* Menor em mobile */
  border-radius: 9999px;
  min-height: 36px;
  min-width: 36px;

  @media (min-width: 640px) {
    padding: 0.5rem;
    min-height: 40px;
    min-width: 40px;
  }

  /* Hover: preenchimento vermelho claro */
  &:hover:not(:disabled) {
    background-color: var(--color-error-container);
    color: var(--color-error);
    border-color: transparent;
  }
`;

/* ─────────────────────────────────────────
   BOTÃO DE AÇÃO DESTRUTIVA (LARGA) — vermelho cheio
   Visual: botão principal de confirmação de exclusão
   Uso: confirmações em modal de exclusão
   ───────────────────────────────────────── */
const BotaoDestrutivoEstilizado = styled(BotaoBase)`
  background-color: var(--color-error);
  color: #fff;
  border: 1px solid transparent;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px rgba(186,26,26,0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-weight: 700;

  &:hover:not(:disabled) {
    filter: brightness(0.95);
    box-shadow: 0 10px 30px rgba(186,26,26,0.16);
  }
`;

/* ─────────────────────────────────────────
   BOTÃO DE AJUSTE RÁPIDO — (+) e (-) da tabela
   Visual: circular com fundo cinza claro
   Uso: Incrementar / decrementar quantidade na tabela
   ───────────────────────────────────────── */
const BotaoAjusteEstilizado = styled(BotaoBase)`
  /* Tamanho menor em mobile para caber nas células */
  width: 1.75rem;
  height: 1.75rem;
  min-height: 1.75rem;
  border-radius: 9999px;
  background-color: var(--color-surface-container-high);
  color: var(--color-on-surface);
  border: 1px solid var(--color-outline-variant);
  padding: 0; /* Sem padding — o tamanho fixo já define o espaço */

  @media (min-width: 640px) {
    width: 2rem;
    height: 2rem;
    min-height: 2rem;
  }

  /* Hover: fundo mais escuro + borda mais definida */
  &:hover:not(:disabled) {
    background-color: var(--color-surface-container-highest);
    border-color: var(--color-on-surface-variant);
  }
`;

/* ── INTERFACES DE PROPRIEDADES ── */

interface PropriedadesBotaoComum extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface PropriedadesBotaoAjuste extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tipo: 'incrementar' | 'decrementar'; /* Define o ícone e a ação do botão */
}

/* ── COMPONENTES EXPORTADOS ── */

/* 1. Botão Primário — ação principal, fundo roxo da marca */
export const BotaoPrimario: React.FC<PropriedadesBotaoComum> = ({
  children,
  ...outrasProps
}) => {
  return (
    <BotaoPrimarioEstilizado {...outrasProps}>
      {children}
    </BotaoPrimarioEstilizado>
  );
};

/* 2. Botão Secundário — ação alternativa, estilo outline */
export const BotaoSecundario: React.FC<PropriedadesBotaoComum> = ({
  children,
  ...outrasProps
}) => {
  return (
    <BotaoSecundarioEstilizado {...outrasProps}>
      {children}
    </BotaoSecundarioEstilizado>
  );
};

/* 3. Botão Excluir — ação destrutiva com ícone de lixeira */
export const BotaoExcluir: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...outrasProps
}) => {
  return (
    <BotaoExcluirEstilizado title="Excluir item" {...outrasProps}>
      <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
        delete
      </span>
    </BotaoExcluirEstilizado>
  );
};

/* 5. Botão Destrutivo — usado para confirmar ações irreversíveis em modais */
export const BotaoDestrutivo: React.FC<PropriedadesBotaoComum> = ({ children, ...outrasProps }) => {
  return (
    <BotaoDestrutivoEstilizado {...outrasProps}>
      {children}
    </BotaoDestrutivoEstilizado>
  );
};

/* 4. Botão de Ajuste Rápido (+/-) para a tabela de estoque */
export const BotaoQuantidade: React.FC<PropriedadesBotaoAjuste> = ({
  tipo,
  ...outrasProps
}) => {
  return (
    <BotaoAjusteEstilizado
      title={tipo === 'incrementar' ? 'Adicionar uma unidade' : 'Remover uma unidade'}
      {...outrasProps}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
        {tipo === 'incrementar' ? 'add' : 'remove'}
      </span>
    </BotaoAjusteEstilizado>
  );
};
