import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ModalContextType {
  temModalAberto: boolean;
  definirTemModalAberto: (valor: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ProvedorModal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [temModalAberto, definirTemModalAberto] = useState(false);

  return (
    <ModalContext.Provider value={{ temModalAberto, definirTemModalAberto }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal deve ser usado dentro do ProvedorModal');
  }
  return context;
};
