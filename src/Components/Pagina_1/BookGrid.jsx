import { useState, useEffect, useContext } from 'react';
import BookCard from './BookCard';
import { Contexto } from './Contexto';

const BookGrid = ({ openModalAluguel }) => {
  const { selectedCategory } = useContext(Contexto);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // 1. CARREGAR DADOS DO LOCALSTORAGE
  useEffect(() => {
    const getBooks = () => {
      try {
        const dadosLocais = localStorage.getItem('livros');
        
        if (dadosLocais) {
          setBooks(JSON.parse(dadosLocais));
        } else {
          // Se não houver dados, cria uma lista inicial de exemplo
          const livrosIniciais = [
            { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", categoria: "Fantasia", quantidade: 5 },
            { id: 2, titulo: "1984", autor: "George Orwell", categoria: "Distopia", quantidade: 2 },
            { id: 3, titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Clássico", quantidade: 0 }
          ];
          localStorage.setItem('livros', JSON.stringify(livrosIniciais));
          setBooks(livrosIniciais);
        }
      } catch (error) {
        console.error('Erro ao buscar livros no LocalStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  // 2. ATUALIZAR FILTROS SEMPRE QUE A LISTA OU PESQUISA MUDAR
  useEffect(() => {
    const filtered = books
      .filter((book) => book.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((book) => selectedCategory ? book.categoria === selectedCategory : true);
    
    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategory, books]);

  // 3. FUNÇÃO DE ALUGAR (Update local)
  const handleRent = (bookTitle) => {
    const novaLista = books.map((book) => {
      if (book.titulo === bookTitle && book.quantidade > 0) {
        return { ...book, quantidade: book.quantidade - 1 };
      }
      return book;
    });

    setBooks(novaLista);
    localStorage.setItem('livros', JSON.stringify(novaLista));
  };

  // 4. FUNÇÃO DE EXCLUIR (Delete local)
  const handleDelete = (bookId) => {
    // Filtra para remover o livro
    const novaLista = books.filter((book) => book.id !== bookId);
    
    // Atualiza o Estado e o LocalStorage
    setBooks(novaLista);
    localStorage.setItem('livros', JSON.stringify(novaLista));
    
    alert("Livro excluído com sucesso!");
  };

  return (
    <div className="p-6 bg-slate-100 rounded-md shadow-md">
      <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquise pelo título do livro"
          className="w-full md:w-auto flex-grow p-2 border rounded-md"
        />
        {/* O botão de pesquisar agora é opcional, pois o useEffect faz a busca em tempo real */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.titulo}
              author={book.autor}
              category={book.categoria}
              quantity={book.quantidade}
              onRent={handleRent}
              onDelete={handleDelete}
              openModalAluguel={openModalAluguel}
            />
          ))
        )}
      </div>
      {filteredBooks.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-4">Nenhum livro encontrado.</p>
      )}
    </div>
  );
};

export default BookGrid;