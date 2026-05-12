import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Logo from "../Img/Logo.png";
import "./Login.css";

function Login() {
  const [usuarios, setUsuarios] = useState([]);
  const [senha, setSenha] = useState(""); 
  const navigate = useNavigate();  

  useEffect(() => {
    // 1. Tenta buscar os usuários no LocalStorage
    const dadosLocais = localStorage.getItem('usuarios');

    if (dadosLocais) {
      // Se existir, carrega no estado
      setUsuarios(JSON.parse(dadosLocais));
    } else {
      // 2. Se não existir (primeiro acesso), cria um usuário padrão para teste
      const usuarioPadrao = [{ id: 1, senha: "123" }];
      localStorage.setItem('usuarios', JSON.stringify(usuarioPadrao));
      setUsuarios(usuarioPadrao);
    }
  }, []);

  const handleLogin = () => {
    // Procura na lista local se existe a senha digitada
    const usuarioValido = usuarios.find(usuario => usuario.senha === senha);

    if (usuarioValido) {
      // Opcional: Salvar quem logou para usar em outras telas
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
      navigate("/home");
    } else {
      alert("Senha incorreta. Tente novamente (Dica: use 123)");
    }
  };

  return (
    <div id="body">
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/caminho-da-imagem.jpg')" }}
      >
        <div className="p-6 rounded-lg shadow-lg w-full sm:w-96" style={{ backgroundColor: "#003f5c" }}>
          <div className="flex justify-center mb-6">
            <img
              src={Logo}
              alt="Logo"
              className="w-32 h-auto"
            />
          </div>

          <input
            type="password"
            placeholder="Digite sua Senha (teste: 123)"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}  
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleLogin}  
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;