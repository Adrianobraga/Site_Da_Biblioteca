// Pagina_3/Rentals.jsx
import React, { useState, useEffect } from "react";

const Rentals = ({ OpenModal }) => {
  const [rentalsData, setRentalsData] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const dadosLocais = localStorage.getItem("alugueis");
      const alugueis = dadosLocais ? JSON.parse(dadosLocais) : [];
      setRentalsData(alugueis);
    } catch (error) {
      console.error("Erro ao carregar aluguéis:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate() + 1).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isPastDate = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const isToday = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return today.toDateString() === dueDate.toDateString();
  };

  const daysRemaining = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  };

  const filteredRentals = rentalsData.filter((rental) => {
    const remainingDays = daysRemaining(rental.data_devolucao);
    if (filter === "todos") return true;
    if (filter === "Em Atraso") return isPastDate(rental.data_devolucao);
    if (filter === "Devolução Hoje") return isToday(rental.data_devolucao);
    if (filter === "Falta Pouco Tempo") return remainingDays > 0 && remainingDays <= 2;
    return false;
  });

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <button onClick={() => setFilter("todos")} className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600">Todos</button>
        <button onClick={() => setFilter("Em Atraso")} className="px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-red-600">Em Atraso</button>
        <button onClick={() => setFilter("Devolução Hoje")} className="px-4 py-2 mx-2 bg-green-500 text-white rounded hover:bg-green-600">Devolução Hoje</button>
        <button onClick={() => setFilter("Falta Pouco Tempo")} className="px-4 py-2 mx-2 bg-orange-400 text-white rounded hover:bg-orange-500">Falta Pouco Tempo</button>
      </div>

      {filteredRentals.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Nenhum aluguel encontrado.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredRentals.map((rental, index) => {
          const remainingDays = daysRemaining(rental.data_devolucao);
          let buttonColor = "bg-gray-300";
          let buttonText = "Em Espera";

          if (isPastDate(rental.data_devolucao)) {
            buttonColor = "bg-red-500 text-white";
            buttonText = "Em Atraso";
          } else if (isToday(rental.data_devolucao)) {
            buttonColor = "bg-green-500 text-white";
            buttonText = "Devolução Hoje";
          } else if (remainingDays > 0 && remainingDays <= 2) {
            buttonColor = "bg-orange-400 text-white";
            buttonText = "Falta Pouco Tempo";
          }

          return (
            <div key={rental.id || index} className="flex flex-col sm:flex-row items-start border p-4 bg-orange-200 rounded-md shadow-sm">
              <div className="flex-1 text-xs sm:text-sm mb-4">
                <p className="text-gray-800 font-semibold">Aluno: {rental.Nome_aluno}</p>
                <p className="text-gray-800 font-semibold">Turma: {rental.turma}</p>
                <p className="text-gray-800 font-semibold">Matrícula: {rental.Matricula}</p>
                <p className="text-gray-800 font-semibold">Livro: {rental.Nome_livro}</p>
                <p className="text-gray-800 font-semibold">Data de Devolução: {formatDate(rental.data_devolucao)}</p>
              </div>
              <button
                className={`mt-auto px-4 py-2 font-semibold rounded w-32 text-center ${buttonColor}`}
                onClick={() => OpenModal(rental)}
              >
                {buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rentals;