// Pagina_3/Modal.jsx
import { useState } from "react";

const Modal = ({ showModal, closeModal, rental }) => {
  if (!showModal) return null;

  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate() + 1).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleConfirmDevolucao = () => {
    if (!rental?.id) return;
    setLoading(true);

    try {
      // Remove o aluguel do localStorage
      const dadosLocais = localStorage.getItem("alugueis");
      const alugueis = dadosLocais ? JSON.parse(dadosLocais) : [];
      const novaLista = alugueis.filter((a) => a.id !== rental.id);
      localStorage.setItem("alugueis", JSON.stringify(novaLista));

      // Devolve o livro (incrementa quantidade)
      const livrosLocais = localStorage.getItem("livros");
      if (livrosLocais && rental.Nome_livro) {
        const livros = JSON.parse(livrosLocais);
        const livrosAtualizados = livros.map((livro) => {
          if (livro.titulo === rental.Nome_livro) {
            return { ...livro, quantidade: livro.quantidade + 1 };
          }
          return livro;
        });
        localStorage.setItem("livros", JSON.stringify(livrosAtualizados));
      }

      alert("Devolução confirmada com sucesso!");
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao confirmar devolução:", error);
      alert("Erro ao confirmar devolução.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Informações do Aluguel</h2>

        <div className="text-gray-700">
          <p><strong className="font-medium">Aluno:</strong> {rental?.Nome_aluno}</p>
          <p><strong className="font-medium">Livro:</strong> {rental?.Nome_livro}</p>
          <p><strong className="font-medium">Matrícula:</strong> {rental?.Matricula}</p>
          <p>
            <strong className="font-medium">Data de Devolução:</strong>{" "}
            {rental?.data_devolucao ? formatDate(rental.data_devolucao) : "N/A"}
          </p>
        </div>

        <div className="text-center text-gray-700">
          <p className="mt-2">Deseja devolver o livro?</p>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition transform hover:scale-105"
          >
            Fechar
          </button>
          <button
            onClick={handleConfirmDevolucao}
            disabled={loading}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full hover:from-green-500 hover:to-green-700 transition transform hover:scale-105"
          >
            {loading ? "Confirmando..." : "Confirmar Devolução"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;