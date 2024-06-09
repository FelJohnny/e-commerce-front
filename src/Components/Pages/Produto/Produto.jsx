import React, { useContext, useEffect } from 'react';
import styles from './Produto.module.css';
import { GlobalContext } from '../../../Context/GlobalContext.jsx';
import Quantidade from '../../Quantidade/Quantidade.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch.jsx';
import {GET_TO_ID} from '../../../Api/api.js'
import Loading from '../../Loading/Loading.jsx';

const Produto = () => {
    const { setCurrentProduto, currentProduto, logout, carrinho, setCarrinho,quantidade,setQuantidade, qtdeCarrinho, setQtdeCarrinho, setPopUp,popupTimeoutRef} = useContext(GlobalContext);
    const { request } = useFetch();
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(()=>{
        async function pegaProdutoPorId(){
            const token = window.localStorage.getItem("token");
                if(token){
                    const { url, options } = GET_TO_ID('produto',id, token)
                    const { response, json } = await request(url, options)
                    if(response.ok){
                        setCurrentProduto(json)
                    }else{
                        navigate('/')
                    }
                }else{
                    logout();
                    navigate('/')
                }
        }
        pegaProdutoPorId();
    },[])
    
    function addCarrinho() {
        console.log(quantidade);
        if (quantidade === null || quantidade === 0 || quantidade === "") {
            setPopUp({
                status:true,
                color: "#e74f4f",
                children: "Insira uma quantidade para prosseguir"
            });
    
            if (popupTimeoutRef.current) {
                clearTimeout(popupTimeoutRef.current);
            }
    
            popupTimeoutRef.current = setTimeout(() => {
                setPopUp({
                    status: false,
                    color: "",
                    children: ""
                });
                popupTimeoutRef.current = null;
            }, 3000);
            return;
        }
        const produtoExistente = carrinho.find(produto => produto.produto.id === currentProduto.id);

        let novoCarrinho;
        if (produtoExistente) {
            novoCarrinho = carrinho.map(produto =>
                produto.produto.id === currentProduto.id ? 
                { ...produto, quantidade: produto.quantidade + quantidade } : produto
            );
        } else {
            novoCarrinho = [...carrinho, { produto: currentProduto, quantidade }];
        }

        setCarrinho(novoCarrinho);
        window.localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        setQuantidade(1)
        setPopUp({
            status:true,
            color: "#46bba2",
            children: "Produto Adicionado ao Carrinho"
        });

        if (popupTimeoutRef.current) {
            clearTimeout(popupTimeoutRef.current);
        }

        popupTimeoutRef.current = setTimeout(() => {
            setPopUp({
                status: false,
                color: "",
                children: ""
            });
            popupTimeoutRef.current = null;
        }, 3000);
    }

    return (
        <section className={styles.produto}>
            {!currentProduto || !currentProduto.usuario_produto ?<Loading/>:(
                <div className={styles.capaPrincipal}>
                <img className={styles.imgProduto} src={currentProduto.url_img_produto} alt={`Imagem_produto${currentProduto.id}`} />
                <div className={styles.descricoes}>
                    <h1>{currentProduto.nome}</h1>
                    {currentProduto&& <p>Vendedor: {currentProduto.usuario_produto.nome_completo}</p>}
                    <div className={styles.precoContainer}>
                        <span className={styles.precoOriginal}>R$ {currentProduto.preco + 40},00</span>
                        <span className={styles.precoAtual}>R$ {currentProduto.preco}</span>
                        <span className={styles.desconto}>{currentProduto.desconto}% OFF</span>
                    </div>
                    <div className={styles.addCarrinhoContainer}>
                        <Quantidade />
                        <button className={styles.button} onClick={addCarrinho}>Adicionar ao Carrinho</button>
                    </div>
                    <div className={styles.descricao}>
                        <h2>Sobre:</h2>
                        <p>Duração: Aventura emocionante com horas de gameplay imersivo.</p>
                        <p>Crítica: Recebeu altas avaliações da crítica especializada.</p>
                        <p>Gráficos: Deslumbrantes e realistas, proporcionando uma experiência visual impressionante.</p>
                        <p>Trilha Sonora: Uma trilha sonora envolvente que complementa perfeitamente a atmosfera do jogo.</p>
                        <p>Requisitos Mínimos de Sistema:</p>
                        <ul>
                            <li>Processador: Dual-core 2.0 GHz</li>
                            <li>Memória RAM: 4 GB</li>
                            <li>Placa de Vídeo: DirectX 11 compatible</li>
                            <li>Armazenamento: 10 GB de espaço disponível</li>
                            <li>Sistema Operacional: Windows 10</li>
                        </ul>
                    </div>
                </div>
            </div>
            )}
        </section>
    );
}

export default Produto;
