import React from 'react';
import { ProvedorEstoque } from './context/EstoqueContext';
import { ProvedorModal } from './context/ModalContext';
import { Rotas } from './routes/rotas';

// Componente App que encapsula o contexto global e renderiza o sistema de rotas
const App: React.FC = () => {
  return (
    <ProvedorModal>
      <ProvedorEstoque>
        <Rotas />
      </ProvedorEstoque>
    </ProvedorModal>
  );
};

export default App;
