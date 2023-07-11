import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Nav1 from "./components/Navbar1";
import CadastroOrcamento from "./pages/cadastroOrcamentos.jsx";
import Orcamentos from "./pages/orcamentos";
function RoutesApp(){
return(
    <BrowserRouter>
       <Nav1/>
        <Routes>
            <Route path="/" element={<Home/>} />
                <Route  path="/cadastroOrcamento" element={<CadastroOrcamento/>}/>
                <Route  path="/orcamentos" element={<Orcamentos/>}/>
        
        </Routes>
    </BrowserRouter>
    )
}
export default RoutesApp;


