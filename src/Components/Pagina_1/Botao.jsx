import React, { useState } from 'react';
import AddBookModal from './Modal';

function Botao({openModal}) {
  return (
    <div>
            <button
              onClick={openModal}
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Adicionar Livro
            </button>
      </div>
  );
}

export default Botao;
