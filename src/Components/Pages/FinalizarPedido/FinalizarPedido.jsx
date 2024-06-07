import React, { useContext } from 'react'
import styles from './FinalizarPedido.module.css'
import { GlobalContext } from '../../../Context/GlobalContext';
import { formataData } from '../../../functions/formataData.js';
import Quantidade from '../../Quantidade/Quantidade.jsx';

const FinalizarPedido = () => {
    const { setPopUp,ativaModal, setAtivaModal, carrinho,qtdeCarrinho,calculaValorTotal } = useContext(GlobalContext);

  return (
    <section className={styles.Container}>
      {carrinho.length ? carrinho.map((produto)=>(
                    <div key={produto.produto.id} className={styles.produto}>
                        <img src={produto.produto.url_img_produto} alt="" />
                        <h1 className={styles.nome}>{produto.produto.nome}</h1>
                        <span className={styles.preco}>Preço: R${produto.produto.preco}</span>
                        <span className={styles.createdAt}>postado em:{formataData(produto.produto.createdAt)}</span>
                        <span className={styles.quantidade}>Quantidade: {produto.quantidade}</span>
                        <Quantidade className={styles.quantidade}/>
                    </div>))
                    :<p>Sem produtos em seu carrinho</p>    
                }
    </section>
  )
}

export default FinalizarPedido
