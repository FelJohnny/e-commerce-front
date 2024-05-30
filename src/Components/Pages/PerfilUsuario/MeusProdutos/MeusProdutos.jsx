import React, { useContext } from 'react'
import styles from './MeusProdutos.module.css'
import {GlobalContext} from '../../../../Context/GlobalContext.jsx'
import Loading from '../../../Loading/Loading.jsx'
const MeusProdutos = () => {
  
  const { userAuth } = useContext(GlobalContext);

  return (
    <div className={styles.MeusProdutos}>
      <h1>Meus Produtos</h1>
      <div>
        {!userAuth.status ?
          <div><Loading/></div>:(
          <>
           em desenvolvimento.. 
          </>
        )}
      </div>
    </div>
  )
}

export default MeusProdutos
