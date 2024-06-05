import React, { useContext, useEffect } from 'react';
import styles from './Produto.module.css';
import { GlobalContext } from '../../../Context/GlobalContext.jsx';
import Quantidade from '../../Quantidade/Quantidade.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch.jsx';
import {GET_TO_ID} from '../../../Api/api.js'

const Produto = () => {
    const { setCurrentProduto, currentProduto, logout, carrinho, setCarrinho,quantidade } = useContext(GlobalContext);
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
        const produtoExistente = carrinho.find(produto => produto.produto.id === currentProduto.id);

        if (produtoExistente) {
            const novoCarrinho = carrinho.map(produto => 
                produto.produto.id === currentProduto.id ? 
                { ...produto, quantidade: produto.quantidade + quantidade } 
                    : produto
            );
            setCarrinho(novoCarrinho);
        } else {
            setCarrinho([...carrinho, { produto: currentProduto, quantidade }]);
        }
    }


    useEffect(()=>{
         console.log(carrinho);
    },[carrinho])
    return (
        <section className={styles.produto}>
            <div className={styles.capaPrincipal}>
                <img className={styles.imgProduto} src={currentProduto.url_img_produto} alt={`Imagem_produto${currentProduto.id}`} />
                <div className={styles.descricoes}>
                    <h1>{currentProduto.nome}</h1>
                    <div className={styles.precoContainer}>
                        <span className={styles.precoOriginal}>R$ 250,00</span>
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
        </section>
    );
}

export default Produto;
