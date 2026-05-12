// Pagina_1/Modal.jsx
import React, { useState } from 'react';

const AddBookModal = ({ showModal, closeModal }) => {
  const [bookData, setBookData] = useState({
    titulo: '',
    autor: '',
    quantidade: '',
    categoria: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookData({ ...bookData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const livrosLocais = localStorage.getItem('livros');
      const livros = livrosLocais ? JSON.parse(livrosLocais) : [];

      // Gera um ID único baseado no maior ID existente
      const novoId = livros.length > 0 ? Math.max(...livros.map((l) => l.id)) + 1 : 1;

      const novoLivro = {
        id: novoId,
        titulo: bookData.titulo,
        autor: bookData.autor,
        categoria: bookData.categoria,
        quantidade: parseInt(bookData.quantidade, 10),
      };

      const novaLista = [...livros, novoLivro];
      localStorage.setItem('livros', JSON.stringify(novaLista));

      alert('Livro adicionado com sucesso!');
      setBookData({ titulo: '', autor: '', quantidade: '', categoria: '' });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      alert('Erro ao adicionar o livro.');
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl mb-4">Adicionar Livro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="titulo" className="block text-sm font-semibold mb-1">Título</label>
              <input type="text" id="titulo" value={bookData.titulo} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="autor" className="block text-sm font-semibold mb-1">Autor</label>
              <input type="text" id="autor" value={bookData.autor} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="quantidade" className="block text-sm font-semibold mb-1">Quantidade</label>
              <input type="number" id="quantidade" value={bookData.quantidade} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="categoria" className="block text-sm font-semibold mb-1">Categoria</label>
              <input type="text" id="categoria" value={bookData.categoria} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Digite a categoria" />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddBookModal;