// Pagina_2/Formulario.jsx
import { useState } from "react";

const initialState = {
  nome: "",
  telefone: "",
  email: "",
  numero_matricula: "",
  turma: "",
};

export default function FormularioAluno() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 11) {
      const formattedPhone = input
        .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
        .replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
      setFormData((prev) => ({ ...prev, telefone: formattedPhone }));
      setError("");
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phoneRegex.test(formData.telefone)) {
      setError("Número de telefone inválido. Use o formato (XX) XXXXX-XXXX.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida telefone antes de salvar
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phoneRegex.test(formData.telefone)) {
      setError("Número de telefone inválido. Use o formato (XX) XXXXX-XXXX.");
      return;
    }

    try {
      const dadosLocais = localStorage.getItem("alunos");
      const alunos = dadosLocais ? JSON.parse(dadosLocais) : [];

      // Verifica se a matrícula já existe
      const matriculaExiste = alunos.find(
        (a) => String(a.numero_matricula) === String(formData.numero_matricula)
      );
      if (matriculaExiste) {
        setError("Já existe um aluno com este número de matrícula.");
        return;
      }

      const novoId =
        alunos.length > 0 ? Math.max(...alunos.map((a) => a.id || 0)) + 1 : 1;

      const novoAluno = { ...formData, id: novoId };
      const novaLista = [...alunos, novoAluno];
      localStorage.setItem("alunos", JSON.stringify(novaLista));

      setSuccessMsg("Aluno cadastrado com sucesso!");
      setError("");
      setFormData(initialState);

      // Limpa a mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      setError("Erro ao cadastrar aluno. Tente novamente.");
      console.error("Erro:", error);
    }
  };

  return (
    <div
      className="p-6 mx-auto max-w-md bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg shadow-lg"
      style={{ backgroundColor: "#eaeaea" }}
    >
      <div className="text-center py-4 text-2xl font-bold text-gray-800">
        Cadastro de Aluno
      </div>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMsg}
        </div>
      )}

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome do aluno"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl bg-white"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mt-3">Telefone</label>
          <input
            type="text"
            name="telefone"
            placeholder="(XX) XXXXX-XXXX"
            value={formData.telefone}
            onChange={handlePhoneChange}
            onBlur={validatePhone}
            className={`w-full p-2 border rounded-xl bg-white ${error ? "border-red-500" : ""}`}
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <label className="block text-sm font-medium text-gray-700 mt-3">Turma</label>
          <select
            name="turma"
            value={formData.turma}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl bg-white"
            required
          >
            <option value="" hidden>Selecionar</option>
            <option value="1 Guia">1 Guia</option>
            <option value="1 Informática">1 Informática</option>
            <option value="1 Enfermagem">1 Enfermagem</option>
            <option value="2 Guia">2 Guia</option>
            <option value="2 Informática">2 Informática</option>
            <option value="2 Enfermagem">2 Enfermagem</option>
            <option value="3 Guia">3 Guia</option>
            <option value="3 Informática">3 Informática</option>
            <option value="3 Enfermagem">3 Enfermagem</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mt-3">Número de Matrícula</label>
          <input
            type="number"
            name="numero_matricula"
            placeholder="Digite o número de matrícula"
            value={formData.numero_matricula}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl bg-white"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mt-3">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Digite o email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl col-span-2 shadow-md mt-4 transition-all"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}