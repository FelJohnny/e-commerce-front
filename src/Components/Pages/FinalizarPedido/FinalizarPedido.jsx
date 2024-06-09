import React, { useContext, useEffect, useState } from 'react';
import styles from './FinalizarPedido.module.css';
import { GlobalContext } from '../../../Context/GlobalContext';
import { formataData } from '../../../functions/formataData.js';
import QuantidadeFPedido from '../../QuantidadeFPedido/QuantidadeFPedido.jsx';
import { Link } from 'react-router-dom';
import { POST_DATA_NOVO_PEDIDO } from '../../../Api/api.js';
import useFetch from '../../../Hooks/useFetch.jsx'
import Loading from '../../Loading/Loading.jsx';

const FinalizarPedido = () => {
  const { carrinho,setCarrinho, quantidades, setPopUp,setQtdeCarrinho } = useContext(GlobalContext);
  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const { request, data, error, loading } = useFetch();

  useEffect(() => {
    const calcularTotais = () => {
      let qtde = 0;
      let valor = 0;
      carrinho.forEach(produto => {
        const quantidade = quantidades[produto.produto.id] || produto.quantidade || 1;
        qtde += quantidade;
        valor += produto.produto.preco * quantidade;
      });
      setQtdeTotal(qtde);
      setValorTotal(valor);
    };

    calcularTotais();
  }, [carrinho, quantidades]);

  const handleSubmit = async () => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.log('Usuário não autorizado');
      return;
    }

      const produtos = carrinho.map(item => ({
      id: item.produto.id,
      quantidade: quantidades[item.produto.id] || item.quantidade,
      preco: item.produto.preco,
    }));
    const { url, options } = POST_DATA_NOVO_PEDIDO('pedido',token, produtos);
    const { response, json } = await request(url, options);
    if (response.ok) {
      window.localStorage.removeItem('carrinho')
      setCarrinho([]);
      setQtdeCarrinho(0)
      setPopUp({
        status:true,
        color: "#46bba2",
        children: "Pedido Criado com Sucesso!"
      });
      setTimeout(()=>{
        setPopUp({
          status:false,
          color: "",
          children: ""
        })
      },3000)
    } else {
      setPopUp({
        status:true,
        color: "#d43328",
        children: "Algum erro inesperado aconteceu"
      });
      setTimeout(()=>{
        setPopUp({
          status:false,
          color: "",
          children: ""
        })
      },2000)

    }
  };
  
  

  return (
    <section className={styles.Container}>
      <div className={styles.colunaUm}>
        {carrinho.length ? carrinho.map((produto) => (
          <div key={produto.produto.id} className={styles.produto}>
            <img src={produto.produto.url_img_produto} alt="" />
            <h1 className={styles.nome}>{produto.produto.nome}</h1>
            <span className={styles.preco}>Preço: R${produto.produto.preco}</span>
            <span className={styles.createdAt}>postado em: {formataData(produto.produto.createdAt)}</span>
            <span>Qtde:</span>
            <QuantidadeFPedido productId={produto.produto.id} currentQtde={produto.quantidade} />
          </div>
        )) : <p>Sem produtos em seu carrinho</p>}
      </div>
      <div className={styles.colunaDois}>
        <p>Qtde. Total: {qtdeTotal}</p>
        <p>Valor Total: R$ {valorTotal.toFixed(2)}</p>
        {carrinho.length ? <button className={styles.btnFinalizar} onClick={handleSubmit} disabled={loading}>Finalizar Pedido</button> : <button disabled={true} className={styles.btnDisabled} >Finalizar Pedido</button>}
        <Link to="/"><button>Adicionar mais Produtos</button></Link>
        {loading&& <Loading/>}
      </div>
    </section>
  );
};

export default FinalizarPedido;
