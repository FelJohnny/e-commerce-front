import React, { useContext, useEffect } from 'react'
import styles from './Loja.module.css'
import useFetch from '../../../Hooks/useFetch.jsx'
import {GET_ALL} from '../../../Api/api.js'
import ProdutoModal from '../../../Modals/ProdutoModal/ProdutoModal.jsx'
import ModalLogin from '../../../Modals/ModalLogin/ModalLogin.jsx'
import { GlobalContext } from '../../../Context/GlobalContext.jsx'
import PopUp from '../../PopUp/PopUp.jsx'

const Loja = () => {
  const {data,loading,error, request, setLoading} = useFetch();
  const { ativaModal, setAtivaModal,popUp, setPopUp } = useContext(GlobalContext);
  
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

      <ModalLogin/>
      <PopUp status={popUp.status} color={popUp.color}>{popUp.children}</PopUp>
    </div>
  )
}

export default Loja
