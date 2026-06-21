import React, { useState, useEffect } from 'react';
import { useTema } from '../context/TemaContext';

interface UsuarioPerfil {
  id?: number;
  nome?: string;
  cargo?: string;
  email?: string;
}

export const Configuracoes: React.FC = () => {
  const { tema, mudarTema } = useTema();
  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState('');
  
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [categorias, setCategorias] = useState<Array<{ id: number; nome: string }>>([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [carregandoCategorias, setCarregandoCategorias] = useState(false);
  const [erroCategoria, setErroCategoria] = useState('');
  const [sucessoSalvar, setSucessoSalvar] = useState('');
  
  useEffect(() => {
    const usuarioRaw = localStorage.getItem('usuario');
    if (usuarioRaw) {
      const usuario: UsuarioPerfil = JSON.parse(usuarioRaw);
      setId(usuario.id ?? null);
      setNome(usuario.nome || '');
      setCargo(usuario.cargo || '');
      setEmail(usuario.email || '');
    }
    
    // Carrega categorias do backend
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    setCarregandoCategorias(true);
    setErroCategoria('');
    try {
      const response = await fetch('/api/categorias');
      if (response.ok) {
        const dados = await response.json();
        setCategorias(dados);
      } else {
        setErroCategoria('Erro ao carregar categorias');
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      setErroCategoria('Erro de conexão');
    } finally {
      setCarregandoCategorias(false);
    }
  };

  const carregarUsuario = () => {
    const usuarioRaw = localStorage.getItem('usuario');
    const usuario: UsuarioPerfil = usuarioRaw ? JSON.parse(usuarioRaw) : {};
    setId(usuario.id ?? null);
    setNome(usuario.nome || '');
    setCargo(usuario.cargo || '');
    setEmail(usuario.email || '');
  };

  const handleSalvar = async () => {
    setErroSalvar('');
    setSucessoSalvar('');
    if (!id) {
      setErroSalvar('Usuário inválido. Faça login novamente.');
      return;
    }

    setSalvando(true);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          nome,
          cargo,
          email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErroSalvar(data.error || 'Erro ao salvar os dados.');
        return;
      }

      localStorage.setItem('usuario', JSON.stringify(data.user));
      carregarUsuario();
      setSucessoSalvar('✓ Todas as alterações foram salvas com sucesso!');
      
      // Remove mensagem de sucesso após 3 segundos
      setTimeout(() => setSucessoSalvar(''), 3000);
    } catch (error) {
      console.error(error);
      setErroSalvar('Erro de conexão ao salvar o perfil.');
    } finally {
      setSalvando(false);
    }
  };

  const handleDescartar = () => {
    setErroSalvar('');
    setSucessoSalvar('');
    setErroCategoria('');
    carregarUsuario();
    carregarCategorias();
    setNovaCategoria('');
  };

  const adicionarCategoria = async () => {
    if (!novaCategoria.trim()) return;

    try {
      setErroCategoria('');
      const response = await fetch('/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novaCategoria.trim() }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErroCategoria(data.error || 'Erro ao adicionar categoria');
        return;
      }

      setCategorias([...categorias, data]);
      setNovaCategoria('');
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      setErroCategoria('Erro de conexão');
    }
  };

  const removerCategoria = async (categoriaId: number) => {
    try {
      setErroCategoria('');
      const response = await fetch(`/api/categorias/${categoriaId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        setErroCategoria(data.error || 'Erro ao remover categoria');
        return;
      }

      setCategorias(categorias.filter((cat) => cat.id !== categoriaId));
    } catch (error) {
      console.error('Erro ao remover categoria:', error);
      setErroCategoria('Erro de conexão');
    }
  };

  return (
    <div className="space-y-8 md:space-y-10 pb-20">
      {/* ── CABEÇALHO COM GRADIENTE ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#3525cd]/5 via-[#f5f2ff] to-[#eae6f4] rounded-3xl p-8 sm:p-10 border border-[#3525cd]/10 shadow-sm">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#3525cd]/3 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#3525cd]/10 rounded-xl">
              <span className="material-symbols-outlined text-[#3525cd] text-2xl">settings</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-on-surface">
              Configurações
            </h1>
          </div>
          <p className="text-on-surface-variant text-base ml-14 max-w-2xl leading-relaxed">
            Personalize seu perfil, defina suas preferências de sistema e gerencie detalhes operacionais.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ── COLUNA ESQUERDA ── */}
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          
          {/* Card: Dados Pessoais */}
          <div className="bg-gradient-to-br from-white to-[#fcf8ff] border border-[#e8e5f1] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#dcd8e5]">
              <div className="p-3 bg-[#3525cd]/10 rounded-xl">
                <span className="material-symbols-outlined text-[#3525cd] text-xl">person</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">Dados Pessoais</h2>
            </div>
            
            {/* Campos Nome e Cargo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 ml-1 uppercase tracking-wide">Nome Completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-3 px-4 outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/30 transition-all text-on-surface font-medium hover:border-[#3525cd]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 ml-1 uppercase tracking-wide">Cargo</label>
                <input
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-3 px-4 outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/30 transition-all text-on-surface font-medium hover:border-[#3525cd]"
                />
              </div>
            </div>

            {/* Campo E-mail */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2 ml-1 uppercase tracking-wide">Endereço de E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-3 px-4 outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/30 transition-all text-on-surface font-medium hover:border-[#3525cd]"
              />
            </div>
          </div>

          {/* Card: Tema do Sistema */}
          <div className="bg-gradient-to-br from-white to-[#fcf8ff] border border-[#e8e5f1] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#dcd8e5]">
              <div className="p-3 bg-[#3525cd]/10 rounded-xl">
                <span className="material-symbols-outlined text-[#3525cd] text-xl">palette</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">Tema do Sistema</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => mudarTema('claro')}
                className={`flex flex-col items-center gap-3 px-6 py-5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  tema === 'claro'
                    ? 'bg-[#3525cd] text-white shadow-lg'
                    : 'bg-white border border-[#dcd8e5] text-on-surface hover:border-[#3525cd] hover:text-[#3525cd]'
                }`}
              >
                <span className="material-symbols-outlined text-3xl">light_mode</span>
                <span>Claro</span>
              </button>
              <button
                onClick={() => mudarTema('escuro')}
                className={`flex flex-col items-center gap-3 px-6 py-5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  tema === 'escuro'
                    ? 'bg-[#3525cd] text-white shadow-lg'
                    : 'bg-white border border-[#dcd8e5] text-on-surface hover:border-[#3525cd] hover:text-[#3525cd]'
                }`}
              >
                <span className="material-symbols-outlined text-3xl">dark_mode</span>
                <span>Escuro</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── COLUNA DIREITA ── */}
        <div className="lg:col-span-5 space-y-6 lg:space-y-8">
          
          {/* Card: Segurança e Senha */}
          <div className="bg-gradient-to-br from-white to-[#fcf8ff] border border-[#e8e5f1] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#dcd8e5]">
              <div className="p-3 bg-[#ba1a1a]/10 rounded-xl">
                <span className="material-symbols-outlined text-[#ba1a1a] text-xl">lock</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">Segurança e Senha</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 ml-1 uppercase tracking-wide">Senha Atual</label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-3 px-4 outline-none focus:border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]/30 transition-all font-mono hover:border-[#ba1a1a]"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 ml-1 uppercase tracking-wide">Nova Senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-3 px-4 outline-none focus:border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]/30 transition-all hover:border-[#ba1a1a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 ml-1 uppercase tracking-wide">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-3 px-4 outline-none focus:border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]/30 transition-all hover:border-[#ba1a1a]"
                />
              </div>

              <button className="w-full mt-4 bg-[#ba1a1a] hover:bg-[#c4302d] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
                Atualizar Senha
              </button>
            </div>
          </div>

          {/* Card: Categorias do Estoque */}
          <div className="bg-gradient-to-br from-white to-[#fcf8ff] border border-[#e8e5f1] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#dcd8e5]">
              <div className="p-3 bg-[#3525cd]/10 rounded-xl">
                <span className="material-symbols-outlined text-[#3525cd] text-xl">category</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">Categorias do Estoque</h2>
            </div>

            {erroCategoria && (
              <div className="mb-4 rounded-xl bg-[#ffeded] border border-[#f5c2c7] text-[#ba1a1a] px-4 py-3 text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {erroCategoria}
              </div>
            )}

            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-1">
              {carregandoCategorias ? (
                <div className="text-center py-6 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl animate-spin">progress_activity</span>
                  <p className="text-sm mt-2">Carregando categorias...</p>
                </div>
              ) : categorias.length > 0 ? (
                categorias.map((cat) => (
                  <div key={cat.id} className="flex justify-between items-center bg-white border border-[#dcd8e5] py-3 px-4 rounded-xl hover:border-[#3525cd] hover:shadow-sm transition-all group dark:bg-[var(--color-surface-container)] dark:border-[var(--color-outline-variant)]">
                    <span className="text-sm font-medium text-on-surface dark:text-[var(--color-on-surface)]">{cat.nome}</span>
                    <button
                      onClick={() => removerCategoria(cat.id)}
                      className="text-on-surface-variant hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center dark:text-[var(--color-on-surface-variant)]"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2 dark:text-[var(--color-outline-variant)]">category</span>
                  <p className="text-sm dark:text-[var(--color-on-surface-variant)]">Nenhuma categoria adicionada</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2 ml-1 uppercase tracking-wide dark:text-[var(--color-on-surface-variant)]">Adicionar Categoria</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={novaCategoria}
                  onChange={(e) => setNovaCategoria(e.target.value)}
                  placeholder="Digite o nome da categoria"
                  onKeyDown={(e) => e.key === 'Enter' && adicionarCategoria()}
                  className="flex-1 bg-white border border-[#dcd8e5] text-sm rounded-xl py-3 px-4 outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/30 transition-all hover:border-[#3525cd] dark:bg-[var(--color-surface-container)] dark:border-[var(--color-outline-variant)] dark:text-[var(--color-on-surface)]"
                />
                <button
                  onClick={adicionarCategoria}
                  disabled={carregandoCategorias || !novaCategoria.trim()}
                  className={`p-3 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 ${
                    carregandoCategorias || !novaCategoria.trim()
                      ? 'bg-[#dcd8e5] text-[#999] cursor-not-allowed dark:bg-[var(--color-surface-container-highest)] dark:text-[var(--color-on-surface)]'
                      : 'bg-gradient-to-br from-[var(--color-primary)] to-[#4d44e3] hover:shadow-lg text-white dark:from-[var(--color-primary)] dark:to-[var(--color-primary-container)]'
                  }`}
                  title="Adicionar categoria"
                >
                  {carregandoCategorias ? (
                    <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined text-xl">add</span>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BARRA DE AÇÕES INFERIOR ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#dcd8e5] shadow-lg md:static md:shadow-none md:border-t md:bg-transparent md:border-[#dcd8e5] dark:bg-[var(--color-surface-container-lowest)] dark:border-[var(--color-outline-variant)]">
        <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 md:p-0">
          {sucessoSalvar ? (
            <div className="mb-4 rounded-xl bg-[#f0f8f4] border border-[#a8d5ba] text-[#006c49] px-5 py-4 text-sm font-medium flex items-center gap-2 animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              {sucessoSalvar}
            </div>
          ) : null}
          {erroSalvar ? (
            <div className="mb-4 rounded-xl bg-[#ffeded] border border-[#f5c2c7] text-[#ba1a1a] px-5 py-4 text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {erroSalvar}
            </div>
          ) : null}
          <div className="pt-6 md:pt-6 md:border-t md:border-[#dcd8e5] dark:md:border-[#333345] flex flex-col-reverse sm:flex-row justify-end items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={handleDescartar}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-[#f5f2ff] hover:text-[#3525cd] border border-[#dcd8e5] transition-all active:scale-95 dark:border-[var(--color-outline-variant)] dark:text-[var(--color-on-surface-variant)] dark:hover:bg-[var(--color-surface-container-high)] dark:hover:text-[var(--color-primary)]"
            >
              Descartar Alterações
            </button>
            <button
              type="button"
              onClick={handleSalvar}
              disabled={salvando}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                salvando
                  ? 'bg-[#dcd8e5] text-[#777587] cursor-not-allowed dark:bg-[var(--color-surface-container-highest)] dark:text-[var(--color-on-surface-variant)]'
                  : 'bg-gradient-to-br from-[var(--color-primary)] to-[#4d44e3] text-white hover:shadow-lg dark:from-[var(--color-primary)] dark:to-[var(--color-primary-container)]'
              }`}
            >
              {salvando ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  Salvando...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  Salvar Tudo
                </>
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
