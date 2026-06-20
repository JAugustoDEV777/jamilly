import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { BarraNavegacao } from '../components/navbar';
import { Cabecalho } from '../components/cabecalho';
import { Dashboard } from '../pages/dashboard';
import { Estoque } from '../pages/estoque';
import { Movimentacoes } from '../pages/movimentacoes';
import { Configuracoes } from '../pages/configuracoes';
import { Login } from '../pages/login';

/* ============================================================
   LAYOUT PRINCIPAL DA APLICAÇÃO
   Estrutura:
     - Sidebar lateral em Desktop (≥ 769px)
     - Barra de navegação inferior em Mobile (< 769px)
     - Cabeçalho superior fixo com busca e ações
     - Área de conteúdo dinâmica (Outlet das rotas filhas)
   ============================================================ */

const LayoutPrincipal: React.FC = () => {
  return (
    /* Wrapper principal que ocupa toda a altura da tela */
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fcf8ff]" style={{ minHeight: '100dvh' }}>

      {/* Navegação: Sidebar em desktop | Barra inferior em mobile */}
      <BarraNavegacao />

      {/* Área de conteúdo principal
          md:ml-[17rem] → desloca o conteúdo para não sobrepor a sidebar
          pb-[calc(5.5rem+env(safe-area-inset-bottom))] → espaço para navbar + safe area em mobile */}
      <main
        className="flex-1 md:ml-[17rem] min-h-screen flex flex-col"
        style={{
          minHeight: '100dvh',
          paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* Em desktop, remove o padding-bottom da main */}
        <style>{`@media (min-width: 769px) { main { padding-bottom: 0 !important; } }`}</style>

        {/* Cabeçalho superior fixo — busca + ícones de notificação/histórico */}
        <Cabecalho />

        {/* Área de conteúdo dinâmico das páginas filhas
            Padding lateral responsivo: menor em mobile, maior em desktop */}
        <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 md:p-10 flex-1 animar-entrada">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

/* ============================================================
   CONFIGURAÇÃO DAS ROTAS DA APLICAÇÃO
   ============================================================ */
export const Rotas: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login (fora do layout principal) */}
        <Route path="/login" element={<Login />} />

        {/* Rota raiz que usa o layout principal com sidebar */}
        <Route path="/" element={<LayoutPrincipal />}>

          {/* Página inicial: Painel de Controle */}
          <Route index element={<Dashboard />} />

          {/* Gestão de inventário de produtos */}
          <Route path="estoque" element={<Estoque />} />

          {/* Histórico e registro de movimentações de carga */}
          <Route path="movimentacoes" element={<Movimentacoes />} />

          {/* Configurações do sistema */}
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
