import React, { useState } from 'react'
import styles from './Quantidade.module.css'

const Quantidade = () => {
    const [quantidade, setQuantidade] = useState(1);

    const incrementar = () => {
      setQuantidade(quantidade + 1);
    };
  
    const decrementar = () => {
      if (quantidade > 1) {
        setQuantidade(quantidade - 1);
      }
    };
  
    return (
      <div>
      <div className={styles.quantidadeContainer}>

        <button onClick={decrementar} className={styles.quantidadeButton}>-</button>
        <span className={styles.quantidadeNumber}>{quantidade}</span>
        <button onClick={incrementar} className={styles.quantidadeButton}>+</button>
      </div>
        <p className={styles.texto}>Qtde</p>
      </div>
    );
};
export default Quantidade
