import React, { createContext, useContext, useState, useEffect } from 'react';

interface TemaContextType {
  tema: 'claro' | 'escuro';
  mudarTema: (novoTema: 'claro' | 'escuro') => void;
}

const TemaContext = createContext<TemaContextType | undefined>(undefined);

export const ProvedorTema: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tema, setTema] = useState<'claro' | 'escuro'>('claro');
  const [carregado, setCarregado] = useState(false);

  // Carrega o tema do localStorage na inicialização
  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as 'claro' | 'escuro' | null;
    if (temaSalvo) {
      setTema(temaSalvo);
      aplicarTema(temaSalvo);
    }
    setCarregado(true);
  }, []);

  const aplicarTema = (novoTema: 'claro' | 'escuro') => {
    const html = document.documentElement;
    
    if (novoTema === 'escuro') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  const mudarTema = (novoTema: 'claro' | 'escuro') => {
    setTema(novoTema);
    localStorage.setItem('tema', novoTema);
    aplicarTema(novoTema);
  };

  if (!carregado) {
    return <>{children}</>;
  }

  return (
    <TemaContext.Provider value={{ tema, mudarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = (): TemaContextType => {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error('useTema deve ser usado dentro de ProvedorTema');
  }
  return context;
};
