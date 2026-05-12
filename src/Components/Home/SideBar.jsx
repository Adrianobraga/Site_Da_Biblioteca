import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
     <aside className="w-64 bg-gray-800 text-black h-screen p-4 sticky top-0" style={{ backgroundColor: "#eaeaea" }}>
        <ul className="space-y-4">
         
        <Link
              to="/livros"
              className="font-bold hover:bg-gray-300 block px-2 py-2 rounded"
            >
          <li>
            Livros
          </li>
          </Link>
  
          
            <li>
            <Link
              to="/alugueis"
              className="font-bold hover:bg-gray-300 block px-2 py-2 rounded"
            >
              Aluguéis
            </Link>
          </li>
          <li>
            <Link
              to="/alunos"
              className="font-bold hover:bg-gray-300 block px-2 py-2 rounded"
            >
              Alunos
            </Link>
          </li>
         
        </ul>
      </aside>
  );
};

export default Sidebar;
