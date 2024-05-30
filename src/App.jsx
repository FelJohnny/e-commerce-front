import './App.css'
import { GlobalStorage } from './Context/GlobalContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loja from './Components/Pages/Loja/Loja';
import Produto from './Components/Pages/Produto/Produto.jsx';
import Header from './Components/Header/Header';

function App() {
  return (  
  <GlobalStorage>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Loja />}/>
        <Route exact path="/produto/*" element={<Produto />}/>
      </Routes>
    </BrowserRouter>
  </GlobalStorage>
  )
}

export default App
