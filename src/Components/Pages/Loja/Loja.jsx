import React, { useEffect } from 'react'
import styles from './Loja.module.css'
import useFetch from '../../../Hooks/useFetch.jsx'
import {GET_ALL} from '../../../Api/api.js'
import ProdutoModal from '../../ProdutoModal/ProdutoModal.jsx'

const Loja = () => {
  const {data,loading,error, request, setLoading} = useFetch();
  
  
  useEffect(()=>{
    async function getProdutos(){
      const {url, options} = GET_ALL('produto')
      const {response, json, error} = await request(url,options);
    }
    getProdutos();
  },[])

  return (
    <div className={`container ${styles.loja}`}>
      {error&& <p>Erro ao carregar produtos</p>}
      {data&& data.servicos.retorno.map((produto, key)=>{
        return(
          <ProdutoModal
            produto={produto}
            key={key}
          />
        )
      })}
      
    </div>
  )
}

export default Loja
