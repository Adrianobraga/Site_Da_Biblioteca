import logo from "../Img/Logo.png";

function Header() {
  return (
    <header className="text-white p-4 w-full flex items-center" style={{ backgroundColor: '#003f5c' }}>
      <img src={logo} alt="Logo da Escola" className="h-36 mr-4" />
      <h1 className="text-5xl font-bold text-center flex-1">Biblioteca Paulo Petrola</h1>
    </header>
  );
}

export default Header;
