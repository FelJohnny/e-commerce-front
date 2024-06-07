import './App.css'
import { GlobalStorage } from './Context/GlobalContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loja from './Components/Pages/Loja/Loja';
import Produto from './Components/Pages/Produto/Produto.jsx';
import Header from './Components/Header/Header';
import PerfilUsuario from './Components/Pages/PerfilUsuario/PerfilUsuario.jsx'
import FinalizarPedido from './Components/Pages/FinalizarPedido/FinalizarPedido.jsx';

function App() {
  return (  
  <GlobalStorage>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Loja />}/>
        <Route exact path="/produto/:id" element={<Produto />}/>
        <Route exact path="/perfil/*" element={<PerfilUsuario />}/>
        <Route exact path="/pedidos/finalizar/*" element={<FinalizarPedido/>}/>
      </Routes>
    </BrowserRouter>
  </GlobalStorage>
  )
}

export default App
