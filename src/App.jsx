import './App.css'
import { GlobalStorage } from './Context/GlobalContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loja from './Components/Pages/Loja/Loja';
import Header from './Components/Header/Header';

function App() {
  return (  
  <GlobalStorage>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Loja />}/>
      </Routes>
    </BrowserRouter>
  </GlobalStorage>
  )
}

export default App
