import React, { useContext } from 'react';
import styles from './Produto.module.css';
import { GlobalContext } from '../../../Context/GlobalContext.jsx';
import Quantidade from '../../Quantidade/Quantidade.jsx';

const Produto = () => {
    const { currentProduto } = useContext(GlobalContext);

    if (currentProduto)
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
                        <button className={styles.button}>Adicionar ao Carrinho</button>
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

    return null;
}

export default Produto;
