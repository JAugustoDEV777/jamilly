import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEstoque } from '../context/EstoqueContext';
import styled from 'styled-components';

/* ============================================================
   COMPONENTE CABEÇALHO DA APLICAÇÃO
   Contém:
     - Campo de busca global (desktop)
     - Botão de notificações (produtos acabando)
     - Botão de histórico (últimas movimentações)
   ============================================================ */

/* Wrapper do popover com overlay de fundo */
const OverlayPopover = styled.div`
  position: fixed;
  inset: 0;
  z-index: 89;
  backdrop-filter: blur(1px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 5rem;
  padding-right: 1rem;
  
  @media (max-width: 640px) {
    align-items: flex-end;
    justify-content: center;
    padding-top: 0;
    padding-right: 0;
  }
`;

/* Janela do popover */
const JanelaPopover = styled.div`
  background: white;
  border: 1px solid #c7c4d8;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 360px;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  animation: popoverEntrada 0.2s ease-out forwards;

  @keyframes popoverEntrada {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    max-width: 100%;
    border-radius: 1rem 1rem 0 0;
    animation: sheetEntrada 0.3s ease-out forwards;
  }

  @keyframes sheetEntrada {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/* Cabeçalho do popover */
const CabecalhoPopover = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f0ecf9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f2ff;
  gap: 0.5rem;

  h3 {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0;
    color: #1b1b24;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: #464555;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(79, 70, 229, 0.1);
      border-radius: 50%;
      color: #3525cd;
    }
  }
`;

/* Conteúdo do popover */
const ConteudoPopover = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: calc(70vh - 60px);
  overflow-y: auto;
`;

/* Item da lista de notificações ou histórico */
const ItemPopover = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #f0ecf9;
  background: #fcf8ff;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f2ff;
    border-color: #e4e1ee;
  }

  .icone {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .conteudo {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    h4 {
      font-size: 0.85rem;
      font-weight: 600;
      margin: 0;
      color: #1b1b24;
      line-clamp: 1;
    }

    p {
      font-size: 0.75rem;
      color: #464555;
      margin: 0;
      line-clamp: 2;
    }
  }

  .valor {
    font-weight: 700;
    font-size: 0.85rem;
    white-space: nowrap;
  }
`;

/* Mensagem vazia */
const MensagemVazia = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  color: #464555;
  font-size: 0.85rem;

  .icone {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    opacity: 0.5;
  }

  p {
    margin: 0;
    opacity: 0.7;
  }
`;

export const Cabecalho: React.FC = () => {
  const { produtos, movimentacoes } = useEstoque();
  const [exibirNotificacoes, definirExibirNotificacoes] = useState(false);
  const [exibirHistorico, definirExibirHistorico] = useState(false);
  const { pathname } = useLocation();

  const usuarioRaw = localStorage.getItem('usuario');
  const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  const iniciais = usuario?.nome
    ? usuario.nome.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase()
    : 'US';
  const nomeUsuario = usuario?.nome || 'Usuário';
  const cargoUsuario = usuario?.cargo || 'Cargo';

  /* ── PRODUTOS COM ESTOQUE BAIXO ── */
  const produtosCriticos = produtos.filter(p => p.quantidade <= p.estoqueMinimo).sort((a, b) => a.quantidade - b.quantidade);

  /* ── ÚLTIMAS MOVIMENTAÇÕES ── */
  const ultimasMovimentacoes = movimentacoes.slice(0, 10);

  return (
    <>
      <header style={{ paddingTop: 'env(safe-area-inset-top)' }} className="sticky top-0 z-40 flex justify-between items-center w-full px-3 sm:px-6 md:px-10 h-14 sm:h-16 md:h-20 bg-[#fcf8ff]/80 backdrop-blur-md border-b border-[#c7c4d8]/40">

        {/* Campo de busca global — oculto em mobile para economizar espaço */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md hidden sm:block">
            <input
              className="w-full pl-4 pr-4 py-2 md:py-2.5 bg-[#f5f2ff] border border-[#c7c4d8]/40 rounded-full text-sm focus:ring-2 focus:ring-[#3525cd] focus:border-transparent outline-none transition-all placeholder:text-[#464555]/50"
              placeholder="Pesquisar no sistema..."
              type="text"
            />
          </div>
        </div>

        {/* Botões de ação do cabeçalho */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex flex-col items-end text-right gap-0.5 mr-1">
            <span className="text-sm font-semibold text-on-surface">{nomeUsuario}</span>
            <span className="text-xs text-on-surface-variant">{cargoUsuario}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#3525cd] text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {iniciais}
          </div>

          {/* Notificações — com badge de alerta vermelho */}
          <button
            onClick={() => {
              definirExibirNotificacoes(!exibirNotificacoes);
              definirExibirHistorico(false);
            }}
            className="p-2 md:p-2.5 text-[#464555] hover:bg-[#eae6f4] rounded-full transition-transform active:scale-90 relative"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl">notifications</span>
            {produtosCriticos.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#ba1a1a] rounded-full"></span>
            )}
          </button>

          {/* Histórico de ações */}
          <button
            onClick={() => {
              definirExibirHistorico(!exibirHistorico);
              definirExibirNotificacoes(false);
            }}
            className="p-2 md:p-2.5 text-[#464555] hover:bg-[#eae6f4] rounded-full transition-transform active:scale-90"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl">history</span>
          </button>
        </div>
      </header>

      {/* ── POPOVER DE NOTIFICAÇÕES ── */}
      {exibirNotificacoes && (
        <OverlayPopover onClick={(e) => { if (e.target === e.currentTarget) definirExibirNotificacoes(false); }}>
          <JanelaPopover>
            <CabecalhoPopover>
              <h3>Produtos Acabando</h3>
              <button onClick={() => definirExibirNotificacoes(false)}>
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </CabecalhoPopover>
            <ConteudoPopover>
              {produtosCriticos.length > 0 ? (
                produtosCriticos.map(p => (
                  <ItemPopover key={p.id}>
                    <div className="icone" style={{ background: '#ffdad6', color: '#ba1a1a' }}>
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div className="conteudo">
                      <h4>{p.nome}</h4>
                      <p>{p.categoria} • Estoque mín: {p.estoqueMinimo}</p>
                    </div>
                    <div className="valor" style={{ color: '#ba1a1a' }}>
                      {p.quantidade}
                    </div>
                  </ItemPopover>
                ))
              ) : (
                <MensagemVazia>
                  <div className="icone">✓</div>
                  <p>Todos os produtos com estoque adequado!</p>
                </MensagemVazia>
              )}
            </ConteudoPopover>
          </JanelaPopover>
        </OverlayPopover>
      )}

      {/* ── POPOVER DE HISTÓRICO ── */}
      {exibirHistorico && (
        <OverlayPopover onClick={(e) => { if (e.target === e.currentTarget) definirExibirHistorico(false); }}>
          <JanelaPopover>
            <CabecalhoPopover>
              <h3>Últimas Movimentações</h3>
              <button onClick={() => definirExibirHistorico(false)}>
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </CabecalhoPopover>
            <ConteudoPopover>
              {ultimasMovimentacoes.length > 0 ? (
                ultimasMovimentacoes.map(mov => (
                  <ItemPopover key={mov.id}>
                    <div
                      className="icone"
                      style={{
                        background: mov.tipo === 'entrada' ? '#6cf8bb20' : '#ffdad6',
                        color: mov.tipo === 'entrada' ? '#006c49' : '#ba1a1a',
                      }}
                    >
                      <span className="material-symbols-outlined">
                        {mov.tipo === 'entrada' ? 'download' : 'local_shipping'}
                      </span>
                    </div>
                    <div className="conteudo">
                      <h4>{mov.produtoNome}</h4>
                      <p>{mov.operacao} • {mov.horario}</p>
                    </div>
                    <div
                      className="valor"
                      style={{ color: mov.tipo === 'entrada' ? '#006c49' : '#ba1a1a' }}
                    >
                      {mov.volume}
                    </div>
                  </ItemPopover>
                ))
              ) : (
                <MensagemVazia>
                  <div className="icone">📋</div>
                  <p>Nenhuma movimentação registrada</p>
                </MensagemVazia>
              )}
            </ConteudoPopover>
          </JanelaPopover>
        </OverlayPopover>
      )}
    </>
  );
};
