import React, { useContext, useEffect, useState } from 'react'
import styles from './Loja.module.css'
import useFetch from '../../../Hooks/useFetch.jsx'
import {GET_ALL_PAGE} from '../../../Api/api.js'
import ProdutoModal from '../../Modals/ProdutoModal/ProdutoModal.jsx'
import Loading from '../../Loading/Loading.jsx'
import Paginacao from '../../Paginação/Paginacao.jsx'
const Loja = () => {
  const {data,loading,error, request, setLoading} = useFetch();

  const [page, setPage] = useState(1)
  const [lastPage,setLastPage] = useState(0)
  const [produtos, setProdutos] = useState(null)
  useEffect(()=>{
    async function getProdutos(){
      const {url, options} = GET_ALL_PAGE('produto',page)
      const {response, json, error} = await request(url,options);
      setProdutos(json)
    }
    getProdutos();
  },[])

  async function paginacao(page){
    //setLoading(true)
    setPage(page)
    const { url, options } = GET_ALL_PAGE("produto",page);
    const { json } = await request(url, options);
    console.log(json);
    setProdutos(json.servicos.retorno);
    setLastPage(json.paginacao.total_Pages)
  }

  return (
    <>
      {error&& <p>Erro ao carregar produtos</p>}
      {loading&&
      <div className={styles.containerLoading}>
        <Loading/>
      </div>}
      
      <div className={`container ${styles.loja}`}>
          {produtos&& !loading&& produtos.servicos.retorno.map((produto, key)=>{
            return(
              <ProdutoModal
              produto={produto}
              key={key}
              />
            )
          })}
      </div>
      {!loading&& <Paginacao paginacao={paginacao} page={page} lastPage={lastPage}/>}

    </>
  )
}

export default Loja
