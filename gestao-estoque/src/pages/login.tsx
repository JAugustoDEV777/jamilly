import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navegar = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);

  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeUsuario, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso: Salva os dados no localStorage e redireciona
        localStorage.setItem('usuario', JSON.stringify(data.user));
        navegar('/');
      } else {
        // Falha: Mostra o erro retornado
        setErro(data.error || 'Erro ao fazer login.');
      }
    } catch (err) {
      console.error(err);
      setErro('Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fcf8ff] font-sans text-on-surface dark:bg-[#0f0f1a]">
      {/* Lado Esquerdo - Formulário (mobile-first, full width em mobile) */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-24 py-8 lg:py-0">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="bg-[#3525cd] text-white p-2 rounded-xl flex items-center justify-center shadow-md dark:bg-[#6f5ffd]">
              <span className="material-symbols-outlined text-xl sm:text-2xl">inventory_2</span>
            </div>
            <div>
              <h1 className="text-[#3525cd] text-xl sm:text-2xl font-black tracking-tight leading-none uppercase dark:text-[#6f5ffd]">Depósito</h1>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5 dark:text-[#b3b0c3]">Gestão de Inventário Inteligente</p>
            </div>
          </div>

          {/* Cabeçalho do Login */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-on-surface dark:text-[#e8e5f0]">Bem-vindo de volta</h2>
            <p className="text-sm text-on-surface-variant dark:text-[#b3b0c3]">Insira suas credenciais para acessar o painel de controle.</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            {erro && (
              <div className="bg-[#ffdad6] dark:bg-[#ba1a1a] text-[#ba1a1a] dark:text-[#ffb4a0] p-3 sm:p-4 rounded-xl text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] flex-shrink-0">error</span>
                <span>{erro}</span>
              </div>
            )}

            {/* Campo Nome de usuário */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1 dark:text-[#b3b0c3]">Nome de usuário</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px] dark:text-[#b3b0c3] pointer-events-none">person</span>
                <input
                  type="text"
                  value={nomeUsuario}
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  placeholder="Seu nome de usuário"
                  className="w-full bg-[#f5f2ff] border border-[#dcd8e5] text-sm rounded-xl py-3 pl-10 pr-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                <label className="block text-xs font-bold text-on-surface-variant">Senha</label>
                <a href="#" className="text-xs font-bold text-[#3525cd] hover:underline">Esqueci minha senha</a>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">lock</span>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#f5f2ff] border border-[#dcd8e5] text-sm rounded-xl py-3 pl-10 pr-10 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3.5 text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {mostrarSenha ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Lembrar-me */}
            <div className="flex items-center gap-2 mt-2 ml-1">
              <input
                type="checkbox"
                id="lembrar"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="w-4 h-4 rounded border-[#dcd8e5] text-[#3525cd] focus:ring-[#3525cd] focus:ring-offset-0 bg-[#f5f2ff]"
              />
              <label htmlFor="lembrar" className="text-xs text-on-surface-variant cursor-pointer select-none">
                Lembrar por 30 dias
              </label>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={carregando}
              className={`w-full font-bold py-3.5 rounded-xl mt-6 shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                carregando
                  ? 'bg-[#dcd8e5] text-[#777587] cursor-not-allowed'
                  : 'bg-[#3525cd] hover:bg-[#4d44e3] text-white hover:shadow-lg'
              }`}
            >
              {carregando ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  Entrando...
                </>
              ) : (
                'Entrar no sistema'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Lado Direito - Decorativo (oculto em telas pequenas) */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#eae6f4] via-[#e4e1ee] to-[#dcd8e5] items-center justify-center p-12 overflow-hidden">
        {/* Elemento de background abstrato */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#3525cd] opacity-5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#3525cd] opacity-5 rounded-full blur-[60px]"></div>

        {/* Card de Depoimento */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-white p-8 rounded-2xl shadow-xl max-w-md">
          <div className="flex gap-1 text-[#006c49] mb-4">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
          <p className="text-xl font-bold italic text-on-surface mb-6 leading-relaxed">
            "O DEPÓSITO centralizou nossa inteligência logística, permitindo decisões rápidas e crescimento constante na nossa operação."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3525cd] text-white rounded-full flex items-center justify-center font-bold text-sm">
              CL
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">Carlos Lemes</p>
              <p className="text-xs text-on-surface-variant">Diretor de Logística, Distribuidora XYZ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
