import React, { useContext, useEffect } from 'react'
import styles from './ProdutoModal.module.css'
import { GlobalContext } from '../../../Context/GlobalContext.jsx';
import { useNavigate } from 'react-router-dom';

const ProdutoModal = ({produto}) => {
    const {id, nome,preco, status, capa_produto,url_img_produto} = produto;
    const { setAtivaModal, userAuth, setCurrentProduto } = useContext(GlobalContext);
    const navigate = useNavigate()

    function abrirProd(){

      if(!userAuth.status){
        setAtivaModal('cadastroUsuario')
      }else{
        setCurrentProduto({
          id: id,
          nome: nome,
          preco: preco,
          status: status,
          capa_produto: capa_produto,
          url_img_produto: url_img_produto,
        });
        navigate(`/produto/${id}`)
      }
      
    }
    
  return (
    <div className={styles.produto}>
      <img src={url_img_produto} alt={`Imagem_produto${id}`} />
      <div className={styles.infoProduto}>
        <h3>{nome}</h3>
        <div className={styles.infoProduto2}>
            <p>R$: {preco}</p>
            <button onClick={abrirProd}>Ver Mais</button>
        </div>
      </div>
    </div>
  )
}

export default ProdutoModal
