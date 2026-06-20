import React from 'react';
import styled from 'styled-components';

/* ============================================================
   COMPONENTES DE ENTRADA (INPUTS)
   Todos os campos usam font-size mínimo de 16px nos inputs
   para evitar o zoom automático do iOS ao focar.
   Estratégia: mobile-first com padding adaptável.
   ============================================================ */

/* Wrapper que envolve o rótulo + campo em coluna */
const WrapperCampo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
`;

/* Rótulo descritivo acima do campo — uppercase, compacto */
const RotuloCampo = styled.label`
  font-size: 0.7rem; /* 11.2px — compacto para economizar espaço em mobile */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
  margin-left: 0.25rem;

  @media (min-width: 640px) {
    font-size: 0.75rem; /* 12px em telas maiores */
  }
`;

/* Input de texto base — utilizado diretamente e como base para inputs especializados */
const InputEstilizado = styled.input`
  width: 100%;
  /* Padding reduzido em mobile para economizar espaço */
  padding: 0.625rem 0.75rem;
  background-color: var(--color-surface-container-lowest);
  border: 1px solid var(--color-outline-variant);
  border-radius: 0.75rem;
  /* Mínimo 16px em mobile para evitar zoom automático */
  font-size: clamp(14px, 4vw, 1rem);
  color: var(--color-on-surface);
  outline: none;
  transition: all 0.2s ease-in-out;
  -webkit-appearance: none;
  appearance: none;

  /* Dark mode support */
  background-color: var(--color-surface-container-lowest);
  color: var(--color-on-surface);

  /* Padding maior em telas maiores */
  @media (min-width: 640px) {
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }

  /* Anel de foco */
  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(53, 37, 205, 0.15);
  }

  /* Placeholder */
  &::placeholder {
    color: var(--color-on-surface-variant);
    opacity: 0.5;
  }

  /* Campos somente leitura */
  &:read-only {
    background-color: var(--color-surface-container-low);
    color: var(--color-on-surface-variant);
    cursor: not-allowed;
  }

  /* Remove setas de number inputs */
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

/* Select (dropdown) com aparência consistente */
const SelectEstilizado = styled.select`
  width: 100%;
  padding: 0.625rem 2.5rem 0.625rem 0.75rem;
  background-color: var(--color-surface-container-lowest);
  border: 1px solid var(--color-outline-variant);
  border-radius: 0.75rem;
  font-size: clamp(14px, 4vw, 1rem);
  color: var(--color-on-surface);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23464555' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 18px;

  @media (min-width: 640px) {
    padding: 0.75rem 2.75rem 0.75rem 1rem;
    font-size: 0.9375rem;
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(53, 37, 205, 0.15);
  }
`;

/* Container do campo monetário com prefixo "R$" absoluto */
const WrapperMonetario = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

/* Label "R$" posicionado dentro do input à esquerda */
const PrefixoMonetario = styled.span`
  position: absolute;
  left: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-on-surface-variant);
  opacity: 0.7;
  pointer-events: none; /* Não intercepta cliques no input */
  user-select: none;
`;

/* Input monetário com padding esquerdo extra para o prefixo "R$" */
const InputMonetarioEstilizado = styled(InputEstilizado)`
  padding-left: 2rem; /* Espaço reservado para o "R$" */
`;

/* ── INTERFACES DE PROPRIEDADES ── */

interface PropriedadesCampoTexto extends React.InputHTMLAttributes<HTMLInputElement> {
  rotulo: string; /* Texto exibido acima do campo */
}

interface PropriedadesCampoSelecao extends React.SelectHTMLAttributes<HTMLSelectElement> {
  rotulo: string; /* Texto exibido acima do dropdown */
  opcoes: { valor: string; texto: string }[]; /* Itens do dropdown */
}

/* ── COMPONENTES EXPORTADOS ── */

/* 1. Campo de texto genérico (nome, conferente, destino, etc.) */
export const CampoTexto: React.FC<PropriedadesCampoTexto> = ({ rotulo, ...outrasProps }) => {
  return (
    <WrapperCampo>
      <RotuloCampo>{rotulo}</RotuloCampo>
      <InputEstilizado type="text" {...outrasProps} />
    </WrapperCampo>
  );
};

/* 2. Campo numérico para quantidades e limites de estoque */
export const CampoNumero: React.FC<PropriedadesCampoTexto> = ({ rotulo, ...outrasProps }) => {
  return (
    <WrapperCampo>
      <RotuloCampo>{rotulo}</RotuloCampo>
      <InputEstilizado
        type="number"
        inputMode="numeric" /* Abre teclado numérico em mobile */
        {...outrasProps}
      />
    </WrapperCampo>
  );
};

/* 3. Campo de seleção (dropdown / select) para categorias e produtos */
export const CampoSelecao: React.FC<PropriedadesCampoSelecao> = ({
  rotulo,
  opcoes,
  ...outrasProps
}) => {
  return (
    <WrapperCampo>
      <RotuloCampo>{rotulo}</RotuloCampo>
      <SelectEstilizado {...outrasProps}>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.texto}
          </option>
        ))}
      </SelectEstilizado>
    </WrapperCampo>
  );
};

/* 4. Campo de entrada monetária com prefixo "R$" integrado */
export const CampoMonetario: React.FC<PropriedadesCampoTexto> = ({
  rotulo,
  ...outrasProps
}) => {
  return (
    <WrapperCampo>
      <RotuloCampo>{rotulo}</RotuloCampo>
      <WrapperMonetario>
        {/* Prefixo visual de moeda — não é parte do valor do input */}
        <PrefixoMonetario>R$</PrefixoMonetario>
        <InputMonetarioEstilizado
          type="text"
          inputMode="decimal" /* Abre teclado com vírgula/ponto em mobile */
          placeholder="0,00"
          {...outrasProps}
        />
      </WrapperMonetario>
    </WrapperCampo>
  );
};
