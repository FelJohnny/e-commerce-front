import React, { useContext } from 'react'
import styles from './ProdutoModal.module.css'
import { GlobalContext } from '../../Context/GlobalContext';

const ProdutoModal = ({produto}) => {
    const {id, nome,preco, status, capa_produto,url_img_produto} = produto;
    const { setAtivaModal} = useContext(GlobalContext);

    function abrirProd(){
      setAtivaModal('login')
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
