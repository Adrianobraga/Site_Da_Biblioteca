import { useState } from "react";

const BookCard = ({ openModalAluguel, title, author, category, quantity, onWait, onDelete, id }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const isAvailable = quantity > 0;

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    onDelete(id); // Passa o ID para a função que o pai forneceu
    setShowConfirmModal(false);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleWait = () => {
    const confirmWait = window.confirm(`O livro "${title}" está indisponível. Deseja ser adicionado à lista de espera?`);
    if (confirmWait) {
      onWait(id); // Melhor usar ID do que título para evitar duplicatas
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
        <div className="flex justify-end">
          <button 
            className="bg-red-600 text-white px-3 rounded hover:bg-red-700" 
            onClick={handleDeleteClick}
          >
            X
          </button>
        </div>

        <h3 className="mt-2 text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{author}</p>
        <p className="text-gray-600">{category}</p>
        <p className="text-gray-500">Quantidade disponível: {quantity}</p>
        
        <button
          className={`mt-4 w-full py-2 rounded-lg transition-colors ${
            isAvailable 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={() => isAvailable ? openModalAluguel(title) : handleWait()} 
        >
          {isAvailable ? 'Alugar' : 'Agendar'}
        </button>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-2xl">
            <h3 className="text-lg font-bold mb-4 text-center">Excluir "{title}"?</h3>
            <div className="flex justify-around mt-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Sim, excluir
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;