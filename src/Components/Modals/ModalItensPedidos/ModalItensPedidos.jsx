import style from './ModalItensPedidos.module.css';
import { GlobalContext } from '../../../Context/GlobalContext.jsx';
import React, { useContext, useRef } from 'react';

const ModalItensPedidos = () => {
  const { ativaModal, setAtivaModal, itensPedido } = useContext(GlobalContext);
  const modalItensPedido = useRef(null);
  const btnClose = useRef(null);

  function closeModal(event) {
    event.preventDefault();
    if (
      event.target === modalItensPedido.current || 
      event.target === btnClose.current
    ) {
      setAtivaModal('');
    }
  }

  function gerarChaveAtivacao() {
    const segmentos = 4;
    const comprimentoSegmento = 4;
    let chave = '';
    for (let i = 0; i < segmentos; i++) {
      if (i > 0) chave += '-';
      chave += Math.random().toString(36).substring(2, 2 + comprimentoSegmento).toUpperCase();
    }
    return chave;
  }

  if (ativaModal !== 'itensPedido') return null;

  return (
    <div ref={modalItensPedido} onClick={closeModal} className={style.containerModal}>
      <div className={style.modal}>
        <button ref={btnClose} onClick={closeModal} className={style.close}>X</button>
        <h1>Itens do Pedido</h1>
        <div className={style.containerItens}>
          {itensPedido.map((produto) => (
            <div key={produto.id} className={style.produto}>
              <img src={produto.url_img_produto} alt="" />
              <h1 className={style.nome}>{produto.nome}</h1>
              <span className={style.qtde}>Qtde: {produto.ItensPedido.quantidade}</span>
              <span className={style.preco}>Preço: R${produto.preco}</span>
              <span className={style.preco1}>Preço total: R${produto.preco * produto.ItensPedido.quantidade}</span>
              <span className={style.key}>Chave de ativação: <br /><br /> {gerarChaveAtivacao()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalItensPedidos;
