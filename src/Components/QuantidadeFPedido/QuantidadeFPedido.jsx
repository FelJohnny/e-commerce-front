import React, { useContext, useEffect, useState } from 'react';
import styles from './QuantidadeFPedido.module.css';
import { GlobalContext } from '../../Context/GlobalContext';

const QuantidadeFPedido = ({ productId, currentQtde }) => {
  const { quantidades, updateQuantidade } = useContext(GlobalContext);
  const [quantidade, setQuantidade] = useState(currentQtde);

  useEffect(() => {
    setQuantidade(currentQtde);
  }, [currentQtde]);

  useEffect(() => {
    if (quantidades[productId] !== undefined) {
      setQuantidade(quantidades[productId]);
    }
  }, [quantidades, productId]);

  const incrementar = () => {
    updateQuantidade(productId, quantidade + 1);
  };

  const decrementar = () => {
    if (quantidade > 1) {
      updateQuantidade(productId, quantidade - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[1-9]\d*$/.test(value) || value === '') {
      updateQuantidade(productId, value === '' ? '' : parseInt(value, 10));
    }
  };

  return (
    <div>
      <div className={styles.quantidadeContainer}>
        <button onClick={decrementar} className={styles.quantidadeButton}>-</button>
        <input className={styles.quantidadeNumber} type="text" value={quantidade} onChange={handleChange} />
        <button onClick={incrementar} className={styles.quantidadeButton}>+</button>
      </div>
    </div>
  );
};

export default QuantidadeFPedido;
