import { HashRouter, Route, Routes } from 'react-router-dom';

import Login from './Components/Login/Login';
import Home from './Components/Home/Index';
import Index from './Components/Pagina_1';
import Alunos from './Components/Pagina_2';
import Alugueis from './Components/Pagina_3/Index';
import Agendado from './Components/Pagina_4/Index';
function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/livros" element={<Index />} />
                <Route path="/alunos" element={<Alunos />} />
                <Route path="/alugueis" element={<Alugueis />} />
                <Route path="/agendado" element={<Agendado />} />

            </Routes>
        </HashRouter>
    );
}

export default AppRoutes;
