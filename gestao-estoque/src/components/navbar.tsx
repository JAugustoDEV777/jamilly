import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/* ============================================================
   COMPONENTE DE NAVEGAÇÃO (NAVBAR)
   Estratégia de responsividade:
     - Desktop (≥ 769px): Sidebar lateral fixa à esquerda
     - Mobile  (< 769px): Barra de navegação fixada no RODAPÉ
   ============================================================ */

/* ─────────────────────────────────────────
   SIDEBAR DESKTOP
   ───────────────────────────────────────── */

/* Container da sidebar lateral — visível apenas em telas grandes */
const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 17rem; /* 272px */
  background-color: var(--color-surface-container-lowest);
  border-right: 1px solid var(--color-outline-variant);
  display: flex;
  flex-direction: column;
  z-index: 50;
  padding: 1.5rem;

  /* Oculta a sidebar em telas mobile */
  @media (max-width: 768px) {
    display: none;
  }
`;

/* Área do logo e título do sistema */
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
`;

/* Ícone quadrado com fundo primário para o logo */
const IconeLogo = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Não encolhe em layouts flex */
`;

/* Texto do nome do sistema ao lado do ícone */
const TituloLogo = styled.span`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--color-on-surface);
`;

/* Lista de links de navegação da sidebar */
const MenuLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1; /* Empurra o perfil para o rodapé */
`;

/* Link individual da sidebar com estado ativo e hover */
const LinkMenu = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1.25rem;
  border-radius: 1rem;
  font-size: 1rem;
  color: var(--color-on-surface-variant);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;

  /* Estado ativo: fundo destacado e cor primária */
  &.active {
    background-color: var(--color-surface-container);
    color: var(--color-primary);
    font-weight: 700;
  }

  /* Hover suave para links não ativos */
  &:hover:not(.active) {
    background-color: var(--color-surface-container-low);
    color: var(--color-on-surface);
  }
`;

/* Seção do rodapé da sidebar com dados do usuário logado */
const SecaoRodapeSidebar = styled.div`
  border-top: 1px solid var(--color-outline-variant);
  padding-top: 1rem;
  margin-top: auto; /* Empurra para o fundo da sidebar */
`;

/* Container com avatar + informações do usuário */
const PerfilInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
`;

/* Avatar circular com iniciais do usuário */
const AvatarPerfil = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  min-width: 2.5rem; /* Evita que o avatar encolha */
  border-radius: 9999px;
  background: linear-gradient(135deg, var(--color-primary), #4d44e3);
  border: 1px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 0.875rem;
  
  /* Quando há imagem, remove o gradiente */
  img {
    border-radius: 9999px;
  }
`;

/* ─────────────────────────────────────────
   BARRA DE NAVEGAÇÃO MOBILE (RODAPÉ)
   ───────────────────────────────────────── */

/* Barra fixada no rodapé da tela em dispositivos móveis */
const BarraNavegacaoInferior = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  /* Altura base + safe area da barra de home do iPhone */
  height: calc(4rem + env(safe-area-inset-bottom, 0px));
  background-color: var(--color-surface-container-lowest);
  border-top: 1px solid var(--color-outline-variant);
  display: flex;
  justify-content: space-around;
  align-items: flex-start; /* Alinha ao topo para que os itens fiquem na parte visível */
  padding-top: 0.4rem;
  z-index: 50;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  /* Respeita a barra de home do iPhone (Dynamic Island) */
  padding-bottom: env(safe-area-inset-bottom, 0px);

  /* Oculta a barra inferior em telas grandes (sidebar assume a navegação) */
  @media (min-width: 769px) {
    display: none;
  }
`;


/* Botão/link individual da barra de navegação mobile */
const LinkMenuMovel = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  text-decoration: none;
  font-size: 0.65rem; /* 12px — mais legível em mobile */
  font-weight: 600;
  color: var(--color-on-surface-variant);
  padding: 0.3rem 1rem;
  border-radius: 0.75rem;
  min-width: 3.5rem;
  transition: all 0.2s;

  /* Estado ativo: fundo e cor primária */
  &.active {
    background-color: var(--color-surface-container);
    color: var(--color-primary);
  }
`;



/* ─────────────────────────────────────────
   COMPONENTE EXPORTADO
   ───────────────────────────────────────── */



export const BarraNavegacao: React.FC = () => {
  const usuarioRaw = localStorage.getItem('usuario');
  const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
  const iniciais = usuario?.nome 
    ? usuario.nome.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase() 
    : 'US';

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };

  return (
    <>
      {/* ── 1. SIDEBAR LATERAL (Visível apenas em Desktop) ── */}
      <SidebarContainer>

        {/* Logo do sistema */}
        <LogoContainer>
          <IconeLogo>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              inventory_2
            </span>
          </IconeLogo>
          <TituloLogo>DEPÓSITO</TituloLogo>
        </LogoContainer>

        {/* Links de navegação */}
        <MenuLinks>
          <LinkMenu to="/app" end>
            <span className="material-symbols-outlined text-2xl">dashboard</span>
            <span>Painel</span>
          </LinkMenu>

          <LinkMenu to="/app/estoque">
            <span className="material-symbols-outlined text-2xl">liquor</span>
            <span>Estoque</span>
          </LinkMenu>

          <LinkMenu to="/app/movimentacoes">
            <span className="material-symbols-outlined text-2xl">local_shipping</span>
            <span>Movimentações</span>
          </LinkMenu>

          <LinkMenu to="/app/configuracoes">
            <span className="material-symbols-outlined text-2xl">settings</span>
            <span>Configurações</span>
          </LinkMenu>
        </MenuLinks>

        {/* Rodapé com perfil do usuário logado */}
        <SecaoRodapeSidebar>
          <div className="flex flex-col gap-2">
            <PerfilInfo>
              <AvatarPerfil>
                {usuario?.foto ? (
                  <img src={usuario.foto} alt="Foto de perfil" className="w-full h-full object-cover" />
                ) : (
                  iniciais
                )}
              </AvatarPerfil>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-on-surface)' }}>
                  {usuario?.nome || 'Usuário'}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {usuario?.cargo || 'Administrador'}
                </p>
              </div>
            </PerfilInfo>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-[#ba1a1a] hover:bg-[#fff1f2] px-3 py-2 rounded-lg transition-colors w-full font-medium"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Sair da conta
            </button>
          </div>
        </SecaoRodapeSidebar>
      </SidebarContainer>

      {/* ── 2. BARRA INFERIOR (Visível apenas em Mobile) ── */}
      <BarraNavegacaoInferior>

        {/* Botão Painel */}
        <LinkMenuMovel to="/app" end>
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span>Painel</span>
        </LinkMenuMovel>

        {/* Botão Estoque */}
        <LinkMenuMovel to="/app/estoque">
          <span className="material-symbols-outlined text-xl">liquor</span>
          <span>Estoque</span>
        </LinkMenuMovel>

        {/* Botão Movimentações */}
        <LinkMenuMovel to="/app/movimentacoes">
          <span className="material-symbols-outlined text-xl">local_shipping</span>
          <span>Movimentos</span>
        </LinkMenuMovel>

        {/* Botão Configurações */}
        <LinkMenuMovel to="/app/configuracoes">
          <span className="material-symbols-outlined text-xl">settings</span>
          <span>Config</span>
        </LinkMenuMovel>

        {/* Botão Sair */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-[0.2rem] text-[0.75rem] font-semibold text-[#ba1a1a] p-2 rounded-xl min-w-[3.5rem] transition-all"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Sair</span>
        </button>
      </BarraNavegacaoInferior>
    </>
  );
};
