import React from 'react'
import styles from './ProdutoModal.module.css'

const ProdutoModal = ({produto}) => {
    const {id, nome,preco, status, capa_produto,url_img_produto} = produto;
    console.log(produto);
  return (
    <div className={styles.produto}>
      <img src={url_img_produto} alt={`Imagem_produto${id}`} />
      <div className={styles.infoProduto}>
        <h3>{nome}</h3>
        <div className={styles.infoProduto2}>
            <p>R$: {preco}</p>
            <button>Ver Mais</button>
        </div>
      </div>
    </div>
  )
}

export default ProdutoModal
