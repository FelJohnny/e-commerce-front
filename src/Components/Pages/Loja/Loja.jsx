import React, { useContext, useEffect } from 'react'
import styles from './Loja.module.css'
import useFetch from '../../../Hooks/useFetch.jsx'
import {GET_ALL} from '../../../Api/api.js'
import ProdutoModal from '../../Modals/ProdutoModal/ProdutoModal.jsx'
import ModalLogin from '../../Modals/ModalLogin/ModalLogin.jsx'
import { GlobalContext } from '../../../Context/GlobalContext.jsx'
import ModalCadastroUsuario from '../../Modals/ModalCadastroUsuario/ModalCadastroUsuario.jsx'
import PopUp from '../../PopUp/PopUp.jsx'
import Loading from '../../Loading/Loading.jsx'
const Loja = () => {
  const {data,loading,error, request, setLoading} = useFetch();
  const { popUp } = useContext(GlobalContext);
  
  useEffect(()=>{
    async function getProdutos(){
      const {url, options} = GET_ALL('produto')
      const {response, json, error} = await request(url,options);
    }
    getProdutos();
  },[])

  return (
    <>
      {error&& <p>Erro ao carregar produtos</p>}
      {loading&&
      <div className={styles.containerLoading}>
        <Loading/>
      </div>}
      
      <div className={`container ${styles.loja}`}>
          {data&& !loading&& data.servicos.retorno.map((produto, key)=>{
            return(
              <ProdutoModal
              produto={produto}
              key={key}
              />
            )
          })}
          <ModalCadastroUsuario/>
          <ModalLogin/>
          <PopUp status={popUp.status} color={popUp.color}>{popUp.children}</PopUp>
      </div>
    </>
  )
}

export default Loja
