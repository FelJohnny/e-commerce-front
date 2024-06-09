import React, { useContext, useEffect, useState } from 'react'
import styles from './MeusPedidos.module.css'
import {GET_PEDIDOS_POR_USER_ID} from '../../../../Api/api.js'
import useFetch from '../../../../Hooks/useFetch'
import { jwtDecode } from 'jwt-decode'
import { GlobalContext } from '../../../../Context/GlobalContext'
import {formataData} from '../../../../functions/formataData.js'
import Loading from '../../../Loading/Loading.jsx'

const MeusPedidos = () => {
    const { logout, setAtivaModal, setItensPedido } = useContext(GlobalContext);
    const { request, loading } = useFetch();
    const [pedidos, setPedidos]= useState([]);

    useEffect(()=>{
        async function pegaPedidos(){
            const token = window.localStorage.getItem('token')
            if(token){
                const {id} = jwtDecode(token)
                const {url, options} = GET_PEDIDOS_POR_USER_ID(id,token);
                const {response, json} = await request(url, options)
                if(response.ok){
                    setPedidos(json)
                }else{

                }
            }else{
                logout();
            }
        }
        pegaPedidos();

    },[])

    useEffect(()=>{
        console.log(pedidos);
    },[pedidos])

    function openItensPedido(pedido){
        console.log(pedido);
        setItensPedido(pedido.produtos)
        setAtivaModal('itensPedido') 
    }

  return (
    <div className={styles.containerMeuPerfil}>
        {loading ?
          <div><Loading/></div>:(
            <>
                {pedidos.length?
                    <>
                    {pedidos.map((pedido)=>(   
                        <div key={pedido.id} className={styles.pedido}>
                    <h1>Nº Pedido: {pedido.id}</h1>
                    <div className={styles.infoPedido}>
                        <div className={styles.infoPedido2}>
                            <h2>Situação: {pedido.status}</h2>
                            <h2>Valor Total: R$ {pedido.total}</h2>
                            <h2>Criado em: {formataData(pedido.createdAt)}</h2>
                            <h2>Ultima atualização: {formataData(pedido.updatedAt)}</h2>
                        </div>
                        <button onClick={()=> openItensPedido(pedido)}>Itens do Pedido</button>
                    </div>
                </div>
            ))}
            </> 
            :<p>Nenhum Pedido Cadastrado</p>}
        </>
    )}
    </div>
  )
}

export default MeusPedidos
