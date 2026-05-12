// Pagina_1/ModalAluguel.jsx
import React, { useState, useRef, useEffect } from "react";

const AluguelModal = ({ showModal, closeModal, bookTitle }) => {
  const [alunos, setAlunos] = useState([]);
  const [search, setSearch] = useState("");
  const [numeroMatricula, setNumeroMatricula] = useState("");
  const [turma, setTurma] = useState("");
  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [dataDevolucao, setDataDevolucao] = useState("");
  const debounceTimeoutRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!dataDevolucao) {
      setDataDevolucao(getDataFutura());
    }
  }, [dataDevolucao]);

  // Busca alunos no localStorage em vez do PHP
  const fetchAlunos = (searchTerm) => {
    if (searchTerm.length > 0) {
      try {
        const dadosLocais = localStorage.getItem("alunos");
        const todosAlunos = dadosLocais ? JSON.parse(dadosLocais) : [];

        const filtrados = todosAlunos
          .filter((aluno) =>
            aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((aluno) => ({
            Nome_aluno: aluno.nome,
            Matricula: aluno.numero_matricula,
            Turma: aluno.turma || "Sem turma",
          }))
          .sort((a, b) => {
            const indexA = a.Nome_aluno.toLowerCase().indexOf(searchTerm.toLowerCase());
            const indexB = b.Nome_aluno.toLowerCase().indexOf(searchTerm.toLowerCase());
            return indexA - indexB;
          });

        setAlunos(filtrados);
        setNoResults(filtrados.length === 0);
        setError("");
      } catch (error) {
        setError("Não foi possível buscar os alunos.");
        setAlunos([]);
        setNoResults(false);
      }
    } else {
      setAlunos([]);
      setError("");
      setNoResults(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      fetchAlunos(e.target.value);
    }, 300);
  };

  const handleAlunoSelect = (aluno) => {
    setSearch(aluno.Nome_aluno);
    setNumeroMatricula(aluno.Matricula);
    setTurma(aluno.Turma);
    setAlunos([]);
  };

  const handleConfirm = () => {
    if (!search || !numeroMatricula || !turma || !dataDevolucao) {
      alert("Por favor, preencha todos os campos antes de confirmar.");
      return;
    }

    try {
      // Verifica se o aluno já tem um aluguel ativo
      const aluguéisLocais = localStorage.getItem("alugueis");
      const alugueis = aluguéisLocais ? JSON.parse(aluguéisLocais) : [];

      const jaAlugou = alugueis.find(
        (a) => String(a.Matricula) === String(numeroMatricula)
      );

      if (jaAlugou) {
        alert("Este aluno já tem um livro alugado e não pode alugar outro no momento.");
        return;
      }

      // Cria o novo aluguel
      const novoId =
        alugueis.length > 0 ? Math.max(...alugueis.map((a) => a.id || 0)) + 1 : 1;

      const novoAluguel = {
        id: novoId,
        Nome_aluno: search,
        Matricula: numeroMatricula,
        turma: turma,
        Nome_livro: bookTitle,
        data_devolucao: dataDevolucao,
      };

      const novaLista = [...alugueis, novoAluguel];
      localStorage.setItem("alugueis", JSON.stringify(novaLista));

      // Decrementa a quantidade do livro no localStorage
      const livrosLocais = localStorage.getItem("livros");
      if (livrosLocais) {
        const livros = JSON.parse(livrosLocais);
        const livrosAtualizados = livros.map((livro) => {
          if (livro.titulo === bookTitle && livro.quantidade > 0) {
            return { ...livro, quantidade: livro.quantidade - 1 };
          }
          return livro;
        });
        localStorage.setItem("livros", JSON.stringify(livrosAtualizados));
      }

      alert("Aluguel registrado com sucesso.");
      closeModal();
      setSearch("");
      setNumeroMatricula("");
      setTurma("");
      setError("");
      window.location.reload();
    } catch (error) {
      alert("Erro ao registrar aluguel. Tente novamente.");
    }
  };

  const getDataFutura = () => {
    const hoje = new Date();
    const dataFutura = new Date(hoje);
    dataFutura.setDate(dataFutura.getDate() + 15);
    const ano = dataFutura.getFullYear();
    const mes = String(dataFutura.getMonth() + 1).padStart(2, "0");
    const dia = String(dataFutura.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center ${
        showModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold">Alugar Livro</h2>
        <p>
          Você deseja alugar o livro: <strong>{bookTitle}</strong>?
        </p>
        <div className="mt-4">
          <div className="mb-4">
            <label htmlFor="nomeAluno" className="block text-sm font-semibold mb-1">
              Nome do Aluno
            </label>
            <input
              type="text"
              id="nomeAluno"
              value={search}
              onChange={handleSearchChange}
              placeholder="Digite o nome do aluno"
              className="w-full p-2 border rounded mb-2"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {noResults && (
              <p className="text-red-500 text-sm">Nenhum aluno encontrado</p>
            )}
            {search && alunos.length > 0 && !noResults && (
              <ul className="border rounded max-h-40 overflow-y-auto mt-2">
                {alunos.map((aluno) => (
                  <li
                    key={aluno.Matricula}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleAlunoSelect(aluno)}
                  >
                    {aluno.Nome_aluno}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="turma" className="block text-sm font-semibold mb-1">Turma</label>
            <input type="text" id="turma" value={turma} readOnly className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <label htmlFor="matricula" className="block text-sm font-semibold mb-1">Matrícula</label>
            <input type="text" id="matricula" value={numeroMatricula} readOnly className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <label htmlFor="dataDevolucao" className="block text-sm font-semibold mb-1">Data de Devolução</label>
            <input
              type="date"
              id="dataDevolucao"
              value={dataDevolucao}
              min={today}
              onChange={(e) => setDataDevolucao(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
              Cancelar
            </button>
            <button type="button" onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AluguelModal;