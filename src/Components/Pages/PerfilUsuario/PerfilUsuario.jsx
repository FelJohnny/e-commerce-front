import MenuLateral from './MenuLateral/MenuLateral.jsx'
import styles from './PerfilUsuario.module.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MeusProdutos from './MeusProdutos/MeusProdutos.jsx'
import MeusDados from './MeusDados/MeusDados.jsx'
import NovoProduto from './NovoProduto/NovoProduto.jsx';
import AlterarProduto from './AlterarProduto/AlterarProduto.jsx';
import MeusPedidos from './MeusPedidos/MeusPedidos.jsx';

const PerfilUsuario = () => {

  return (
    <div className={`${styles.PerfilContainer} container`}>
        
        <section className={`${styles.containerMeuPerfil} `}>
            <MenuLateral
                link1={'meus_dados'} 
                link2={'produtos'}
                link3={'pedidos'}
                text1={'Meus Dados'}
                text2={'Meus Produtos'}
                text3={'Meus Pedidos'}
                />
            <Routes>
                <Route path='meus_dados' element={<MeusDados/>}/>
                <Route path='produtos' element={<MeusProdutos/>}/> 
                <Route path='pedidos' element={<MeusPedidos/>}/>
                <Route path='produtos/cadastro' element={<NovoProduto/>}/> 
                <Route path='produtos/altera' element={<AlterarProduto/>}/>
            </Routes>
        
        </section>
    </div>
  )
}

export default PerfilUsuario
