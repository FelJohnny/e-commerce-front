import React, {useContext} from 'react'
import styles from './MeusDados.module.css'
import {GlobalContext} from '../../../../Context/GlobalContext.jsx'
import Loading from '../../../Loading/Loading.jsx'
const MeusDados = () => {
  const { userAuth } = useContext(GlobalContext);


  return (
    <div className={styles.perfilContainer}>

      <h1>Meus Dados</h1>
      <div>
        {!userAuth.status ?
          <div><Loading/></div>:(
          <>
            <h2>Nome Completo</h2>
            <h3>{userAuth.status&& userAuth.usuario.nome_completo ? userAuth.usuario.nome_completo : 'não informado'}</h3>
            <h2>Email Cadastrado</h2>
            <h3>{userAuth.status&& userAuth.usuario.email ? userAuth.usuario.email : 'não informado'}</h3>
            <h2>Privilégios</h2>
            <h3>{userAuth.status&& userAuth.usuario.rule_id ? userAuth.usuario.rule_id :'não cadastrado'}</h3>
            <div>
              <h1>Meus Pedidos</h1>
              <div>
                pedidos...
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MeusDados
