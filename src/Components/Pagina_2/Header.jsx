function Header() {
  return (
    <header
      className="text-white p-4 w-full flex items-center top-0 left-0 z-10 shadow-md"
      style={{
        background: "linear-gradient(90deg, #003f5c, #2f4b7c)",
      }}
    >
      {/* Placeholder para logo - Substitua pela URL da sua logo */}
      <img
        src="https://via.placeholder.com/150x150?text=Logo"
        alt="Logo da Escola"
        className="h-20 w-20 object-cover mr-4 rounded-lg shadow-lg"
      />
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center flex-1">
        Biblioteca Paulo Petrola
      </h1>
    </header>
  );
}

export default Header;
