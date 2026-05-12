import React, { useState, useRef, useEffect } from "react";
import Formulario from "./Formulario";
import { Link } from "react-router-dom";

function SideBar() {
  const [activeSection, setActiveSection] = useState("Cadastro");
  const [menuVisible, setMenuVisible] = useState(false);
  const [turmaInfo, setTurmaInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Para pesquisa
  const [isRentalHistoryModalOpen, setIsRentalHistoryModalOpen] =
    useState(false);
  const [rentalHistory, setRentalHistory] = useState([]);

  const menuRef = useRef(null);

  const toggleSubMenu = () => setMenuVisible((prev) => !prev);

  const fetchTurmaInfo = async (turma) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost/banco2/select.php");
      const data = await response.json();
      const turmasEncontradas = data.filter((item) => item.turma === turma);

      setTurmaInfo(turmasEncontradas.length > 0 ? turmasEncontradas : []);
    } catch (error) {
      console.error("Erro ao buscar dados da turma:", error);
      setTurmaInfo([]);
    }
    setLoading(false);
  };

  const handleEditClick = (turma) => {
    setFormData(turma); // Preenche o formulário com os dados do aluno selecionado
    setIsModalOpen(true); // Abre a modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Fecha a modal
    setFormData({}); // Reseta o formulário
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateAlunoData = async () => {
    setLoading(true);
    console.log("Dados a serem enviados:", formData); // Verifique os dados aqui
    try {
      const response = await fetch("http://localhost/banco2/update.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Resposta da API:", result); // Verifique a resposta da API

      if (response.ok) {
        alert(result.message || "Dados atualizados com sucesso!");
        fetchTurmaInfo(activeSection); // Recarrega as informações da turma
        handleModalClose(); // Fecha a modal
      } else {
        alert(result.error || "Erro ao atualizar os dados.");
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      alert("Erro ao tentar atualizar.");
    }
    setLoading(false);
  };

  const handleDeleteClick = async (numero_matricula) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      setLoading(true); // Ativa o estado de carregamento
      try {
        const response = await fetch("http://localhost/banco2/delete.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ numero_matricula }), // Envia o numero_matricula
        });

        const result = await response.json(); // Processa a resposta como JSON

        if (result.success) {
          alert("Aluno excluído com sucesso!"); // Alerta de sucesso
          fetchTurmaInfo(activeSection); // Recarrega as informações da turma
        } else {
          alert("Erro ao excluir aluno."); // Alerta de erro
        }
      } catch (error) {
        console.error("Erro ao excluir aluno:", error); // Exibe o erro no console
        alert("Erro ao tentar excluir."); // Alerta de erro genérico
      } finally {
        setLoading(false); // Desativa o estado de carregamento
      }
    }
  };

  const atualizarTodasSeries = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost/banco2/increment.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        alert("Séries atualizadas com sucesso!");
        fetchTurmaInfo(activeSection); // Recarrega os dados
      } else {
        alert(result.error || "Erro ao atualizar as séries.");
      }
    } catch (error) {
      console.error("Erro ao atualizar as séries:", error);
      alert("Erro ao tentar atualizar as séries.");
    }
    setLoading(false);
  };
  const handleShowRentalHistory = async (matricula) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost/banco2/historic.php?matricula=${matricula}`
      );
      const data = await response.json();
      console.log(data); // Verifique o que está sendo retornado aqui
      if (data.data.length > 0) {
        setRentalHistory(data.data);
        setIsRentalHistoryModalOpen(true);
      } else {
        alert("Nenhum aluguel encontrado para esse aluno.");
      }
    } catch (error) {
      console.error("Erro ao buscar o histórico:", error);
      alert("Erro ao buscar o histórico de alugueis.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalOpen = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpdateAllSeries = async () => {
    setIsConfirmModalOpen(false);
    atualizarTodasSeries(); // Chama a função de atualizar as séries
  };

  const isInicioDoAno = () => {
    const currentMonth = new Date().getMonth() + 1; // Janeiro = 0, então somamos 1
    return currentMonth === 1 || currentMonth === 2; // Apenas Janeiro e Fevereiro
  };

  const renderContent = () => {
    if (activeSection === "Cadastro") return <Formulario />;
    if (
      activeSection.startsWith("1") ||
      activeSection.startsWith("2") ||
      activeSection.startsWith("3")
    ) {
      return (
        <div className="h-auto p-5 mx-auto bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md top-52 max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Detalhes sobre a turma {activeSection}
            </h2>
            {isInicioDoAno() && (
              <button
                onClick={handleConfirmModalOpen}
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Atualizar todas as turmas
              </button>
            )}
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Pesquisar aluno"
              className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 dark:bg-gray-700 bg-gray-100"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={() => fetchTurmaInfo(activeSection)}
            >
              Buscar
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-8 h-8"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Carregando informações...
              </p>
            </div>
          ) : turmaInfo.length > 0 ? (
            turmaInfo
              .filter(
                (turma) =>
                  turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra os alunos pelo nome
              )
              .map((turma, index) => (
                <div
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-md mt-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Informações da Turma {turma.turma}
                  </h3>
                  <ul className="space-y-3">
                    {Object.entries(turma).map(([key, value]) => (
                      <li key={key} className="flex items-start space-x-3">
                        <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">
                          {key.replace("_", " ")}:
                        </span>
                        <span className="text-gray-700 dark:text-gray-100">
                          {value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleEditClick(turma)}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    Editar Dados
                  </button>
                  <button
                    onClick={() => handleDeleteClick(turma.numero_matricula)} // Passando o numero_matricula para excluir
                    className="mt-4 ml-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() =>
                      handleShowRentalHistory(turma.numero_matricula)
                    } // Passando o numero_matricula do aluno
                    className="mt-4 ml-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4  rounded"
                  >
                    Histórico de Aluguéis
                  </button>
                </div>
              ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Sem dados para esta turma ou erro ao buscar.
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screentransition-colors duration-300"
      style={{ backgroundColor: "#f4e1d2" }}
    >
      <aside
        className="w-64 bg-gray-800 text-black h-screen p-4 sticky top-0"
        style={{ backgroundColor: "#eaeaea" }}
      >
        <ul className="space-y-4">
          <Link
            to="/livros"
            className="font-bold hover:bg-gray-300 block px-2 py-2 rounded"
          >
            <li>Livros</li>
          </Link>
          <Link
            to="/alugueis"
            className="font-bold hover:bg-gray-300 block px-2 py-2 rounded"
          >
            <li>Aluguéis</li>
          </Link>
          <li
            ref={menuRef}
            className="font-bold hover:bg-gray-300 block px-2 py-2 rounded"
            onClick={toggleSubMenu}
          >
            Alunos
            {menuVisible && (
              <ul className="absolute left-full top-0 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-lg p-2 rounded-md w-48 space-y-2">
                {[
                  "Cadastro",
                  "1 Informática",
                  "1 Enfermagem",
                  "1 Guia",
                  "2 Informática",
                  "2 Enfermagem",
                  "2 Guia",
                  "3 Informática",
                  "3 Enfermagem",
                  "3 Guia",
                ].map((item) => (
                  <li
                    key={item}
                    className="hover:bg-gray-400 dark:hover:bg-gray-600 px-2 py-1 rounded cursor-pointer"
                    onClick={() => setActiveSection(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
          
        </ul>
      </aside>

      <main className="flex-1 p-4">
        {renderContent()}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Atualizar Dados
              </h2>
              <form>
                {Object.keys(formData).map((key) => (
                  <div key={key} className="mb-4">
                    <label
                      className="block text-gray-700 dark:text-gray-300 font-bold mb-2 capitalize"
                      htmlFor={key}
                    >
                      {key.replace("_", " ")}
                    </label>
                    <input
                      id={key}
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700"
                    />
                  </div>
                ))}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={updateAlunoData}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isConfirmModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Confirmar Atualização
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Você tem certeza que deseja atualizar todas as turmas?
              </p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={handleConfirmModalClose}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmUpdateAllSeries}
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
        {isRentalHistoryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Livros alugados
              </h2>
              {rentalHistory.length > 0 ? (
                <ul className="space-y-3">
                  {rentalHistory.map((rental, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <p>
                        <strong>Livro:</strong> {rental.Nome_livro}
                      </p>
                      <p>
                        <strong>Autor:</strong> {rental.autor}
                      </p>
                      <p>
                        <strong>Categoria:</strong> {rental.categoria}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  Nenhum aluguel encontrado.
                </p>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsRentalHistoryModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SideBar;