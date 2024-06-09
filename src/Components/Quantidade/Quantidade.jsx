import React, { useContext, useState } from 'react'
import styles from './Quantidade.module.css'
import { GlobalContext } from '../../Context/GlobalContext';



const Quantidade = () => {
    const { quantidade, setQuantidade, ...props} = useContext(GlobalContext);

    const incrementar = () => {
      setQuantidade(quantidade + 1);
    };
  
    const decrementar = () => {
      if (quantidade > 1) {
        setQuantidade(quantidade - 1);
      }
    };

    const handleChange = (e) => {
      const value = e.target.value;
      if (/^[1-9]\d*$/.test(value) || value === '') {
          setQuantidade(value === '' ? '' : parseInt(value, 10));
      }
  };
  
    return (
      <div>
      <div className={styles.quantidadeContainer}>
        <button onClick={decrementar} className={styles.quantidadeButton}>-</button>
        <input className={styles.quantidadeNumber} type="text" value={quantidade} onChange={handleChange}/>
        <button onClick={incrementar} className={styles.quantidadeButton}>+</button>
      </div>
        <p className={styles.texto}>Qtde</p>
      </div>
    );
};
export default Quantidade
