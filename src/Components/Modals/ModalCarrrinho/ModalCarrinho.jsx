import React, { useContext, useRef } from 'react'
import styles from './ModalCarrinho.module.css'
import { GlobalContext } from '../../../Context/GlobalContext';
import { formataData } from '../../../functions/formataData.js';
import { Link } from 'react-router-dom';

const ModalCarrinho = () => {

    const { setPopUp,ativaModal, setAtivaModal, carrinho,qtdeCarrinho,calculaValorTotal } = useContext(GlobalContext);
    const modalConfirm = useRef(null)
    const BtnClose = useRef(null)

    function closeModal(event){
        event.preventDefault()
        if(event.target == modalConfirm.current || event.target == BtnClose.current){
          setAtivaModal('')
        }
      }

    if(ativaModal === 'ModalCarrinho' )
  return (
    <div ref={modalConfirm} className={styles.modalContainer} onClick={closeModal} >
        <div className={styles.modal}>
            <div className={styles.headerCarrinho}>
                <h1>Meu Carrinho</h1>
                <a onClick={closeModal} href="" ref={BtnClose}>Fechar</a>
            </div>
            <div className={styles.lista}>
                {carrinho.length ? carrinho.map((produto)=>(
                    <div key={produto.produto.id} className={styles.produto}>
                        <img src={produto.produto.url_img_produto} alt="" />
                        <h1 className={styles.nome}>{produto.produto.nome}</h1>
                        <span className={styles.preco}>Preço: R${produto.produto.preco}</span>
                        <span className={styles.createdAt}>postado em:{formataData(produto.produto.createdAt)}</span>
                        <span className={styles.quantidade}>Quantidade: {produto.quantidade}</span>
                    </div>))
                    :<p>Sem produtos em seu carrinho</p>    
                }
            </div>
            <div>
                <p>Qtde. Total : {qtdeCarrinho}</p>
                <p>Valor Total : R$ {calculaValorTotal().toFixed(2)}</p>
            </div>
            <div className={styles.btnCarrinho}>
                <Link to={'/'}><button className={styles.addProduto} onClick={()=> setAtivaModal('')}>Adicionar mais itens</button></Link>
                <Link to="/pedidos/finalizar" onClick={()=>{setAtivaModal('')}}><button className={styles.finalizarPed}>Finalizar Compra</button></Link>
            </div>
        </div>
    </div>
  )
}

export default ModalCarrinho
