import React, { useState } from 'react';

export const Configuracoes: React.FC = () => {
  const [nome, setNome] = useState('Ricardo Silva');
  const [cargo, setCargo] = useState('Gerente de Logística');
  const [email, setEmail] = useState('ricardo.silva@deposito.com.br');
  const [tema, setTema] = useState<'claro' | 'escuro'>('claro');
  const [idioma, setIdioma] = useState('pt-BR');
  
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [categorias, setCategorias] = useState(['Bebidas', 'Alimentos', 'Limpeza']);
  const [novaCategoria, setNovaCategoria] = useState('');

  const adicionarCategoria = () => {
    if (novaCategoria.trim()) {
      setCategorias([...categorias, novaCategoria.trim()]);
      setNovaCategoria('');
    }
  };

  const removerCategoria = (index: number) => {
    setCategorias(categorias.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-20">
      {/* ── CABEÇALHO ── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
          Configurações do Sistema
        </h1>
        <p className="text-on-surface-variant mt-1 text-sm">
          Gerencie suas preferências pessoais e detalhes operacionais do depósito.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ── COLUNA ESQUERDA ── */}
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          
          {/* Card: Dados Pessoais */}
          <div className="bg-white border border-[#c7c4d8]/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">person</span>
              Dados Pessoais
            </h2>
            
            {/* Foto de Perfil */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 bg-[#f5f2ff] rounded-full border border-[#dcd8e5] flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">person</span>
                <button className="absolute bottom-0 right-0 bg-[#3525cd] text-white p-0.5 rounded-full flex items-center justify-center transform translate-x-1/4 translate-y-1/4 border-2 border-white">
                  <span className="material-symbols-outlined text-[10px]">photo_camera</span>
                </button>
              </div>
              <div>
                <div className="flex gap-3">
                  <button className="text-sm font-bold text-[#3525cd] hover:underline">Alterar foto</button>
                  <button className="text-sm font-bold text-[#ba1a1a] hover:underline">Remover</button>
                </div>
              </div>
            </div>

            {/* Campos Nome e Cargo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1">Nome Completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-2.5 px-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all text-on-surface font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1">Cargo</label>
                <input
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-2.5 px-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all text-on-surface font-medium"
                />
              </div>
            </div>

            {/* Campo E-mail */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1">Endereço de E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-2.5 px-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all text-on-surface font-medium"
              />
            </div>
          </div>

          {/* Card: Tema do Sistema */}
          <div className="bg-white border border-[#c7c4d8]/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">palette</span>
              Tema do Sistema
            </h2>
            
            <div className="flex bg-[#f5f2ff] p-1 rounded-xl w-max">
              <button
                onClick={() => setTema('claro')}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                  tema === 'claro'
                    ? 'bg-white shadow-sm text-[#3525cd]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">light_mode</span>
                Claro
              </button>
              <button
                onClick={() => setTema('escuro')}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                  tema === 'escuro'
                    ? 'bg-white shadow-sm text-[#3525cd]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                Escuro
              </button>
            </div>
          </div>

          {/* Card: Preferências Regionais */}
          <div className="bg-white border border-[#c7c4d8]/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">language</span>
              Preferências Regionais
            </h2>
            
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1">Idioma</label>
              <div className="relative">
                <select
                  value={idioma}
                  onChange={(e) => setIdioma(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#dcd8e5] text-sm rounded-xl py-2.5 px-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all text-on-surface font-medium cursor-pointer"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (United States)</option>
                  <option value="es-ES">Español (España)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── COLUNA DIREITA ── */}
        <div className="lg:col-span-5 space-y-6 lg:space-y-8">
          
          {/* Card: Segurança e Senha */}
          <div className="bg-white border border-[#c7c4d8]/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">lock</span>
              Segurança e Senha
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1">Senha Atual</label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-2.5 px-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all font-mono"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1">Nova Senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-2.5 px-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full bg-white border border-[#dcd8e5] text-sm rounded-xl py-2.5 px-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all"
                />
              </div>

              <button className="w-full mt-2 bg-[#f5f2ff] text-[#3525cd] font-bold text-sm py-3 rounded-xl hover:bg-[#eae6f4] transition-colors border border-[#3525cd]/10">
                Atualizar Senha
              </button>
            </div>
          </div>

          {/* Card: Categorias do Estoque */}
          <div className="bg-white border border-[#c7c4d8]/60 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">category</span>
              Categorias do Estoque
            </h2>

            <div className="space-y-3 mb-6">
              {categorias.map((cat, index) => (
                <div key={index} className="flex justify-between items-center bg-[#fcf8ff] border border-[#dcd8e5] py-2.5 px-4 rounded-xl">
                  <span className="text-sm font-medium text-on-surface">{cat}</span>
                  <button onClick={() => removerCategoria(index)} className="text-on-surface-variant hover:text-[#ba1a1a] transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 ml-1">Adicionar Categoria</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={novaCategoria}
                  onChange={(e) => setNovaCategoria(e.target.value)}
                  placeholder="Nome da categoria"
                  onKeyDown={(e) => e.key === 'Enter' && adicionarCategoria()}
                  className="flex-1 bg-white border border-[#dcd8e5] text-sm rounded-xl py-2.5 px-4 outline-none focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] transition-all"
                />
                <button
                  onClick={adicionarCategoria}
                  className="bg-[#3525cd] hover:bg-[#4d44e3] text-white p-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BARRA DE AÇÕES INFERIOR ── */}
      <div className="pt-6 border-t border-[#dcd8e5] flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
        <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-[#f5f2ff] hover:text-[#3525cd] border border-[#dcd8e5] sm:border-transparent transition-all">
          Descartar Alterações
        </button>
        <button className="w-full sm:w-auto px-8 py-2.5 rounded-xl font-bold text-sm text-white bg-[#3525cd] hover:bg-[#4d44e3] shadow-md hover:shadow-lg transition-all active:scale-95">
          Salvar Tudo
        </button>
      </div>

    </div>
  );
};
