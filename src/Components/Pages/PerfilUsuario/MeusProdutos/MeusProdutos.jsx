import React, { useContext, useEffect, useState } from 'react'
import styles from './MeusProdutos.module.css'
import {GlobalContext} from '../../../../Context/GlobalContext.jsx'
import Loading from '../../../Loading/Loading.jsx'
import {GET_PRODUTOS_POR_USUARIO} from '../../../../Api/api.js'
import useFetch from '../../../../Hooks/useFetch.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Confirm from '../../../Confirm/Confirm.jsx'
import { formataData } from '../../../../functions/formataData.js';



const MeusProdutos = () => {
  
  const { logout, setAtivaModal, ativaModal, setDataUpdate } = useContext(GlobalContext);
  const {request, loading, error,} = useFetch()
  const [produtos, setProdutos] = useState([])
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [nomeProd, setNomeProd]=useState(null)
  const navigate = useNavigate();


  useEffect(()=>{
    async function pegaProdutosPorUsuario(){
      const token = window.localStorage.getItem("token");
      if(token){
        const { id } = jwtDecode(token);
        const {url, options} = GET_PRODUTOS_POR_USUARIO(id, token)
        const {response, json} = await request(url, options)
        if(response.ok){
          setProdutos(json.produtos)
        }
      }else{
        logout();
        navigate('/')
      }
    }
    pegaProdutosPorUsuario()
  },[])

  const confirmUpdate = (produto) => {
    if(produto.id){
      setIdToUpdate(produto.id);
      setNomeProd(produto.nome)
      setAtivaModal("confirmUpdate");
      setDataUpdate(produto)
    }
  };

  const confirmDelete = (produto) => {
    if(produto.id){
      setIdToDelete(produto.id);
      setNomeProd(produto.nome)
      setAtivaModal("confirmDelete");
    }
  };

  return (
    <div className={styles.MeusProdutos}>
      <div className={styles.cabecalho}>
        <h1>Meus Produtos</h1>
        <Link to={'cadastro'}><button>+ Cadastrar novo produto</button></Link>
      </div>
      <div>
        {loading&& produtos ?
          <div><Loading/></div>:(
          <>
           {produtos.map((produto)=>(

            <div key={produto.id} className={styles.produto}>
              <img src={produto.url_img_produto} alt="" />
              <h1 className={styles.nome}>{produto.nome}</h1>
              <span className={styles.preco}>Preço: R${produto.preco}</span>
              <span className={styles.createdAt}>criado em:{formataData(produto.createdAt)}</span>
              <span className={styles.updatedAt}>ultima atulização:{formataData(produto.updatedAt)}</span>
              <div className={styles.buttons}>
                <button>Visualizar</button>
                <button onClick={()=>confirmUpdate(produto)}>Alterar</button>
                <button onClick={()=>confirmDelete(produto)}>Excluir</button>
              </div>
            </div>
           ))}
          </>
        )}
      </div>
      {ativaModal === 'confirmDelete' && idToDelete && 
      <Confirm
        mensagem="Tem certeza que deseja deletar este Produto?"
        id={idToDelete}
        table='produto'
        setProdutos={setProdutos}
      />}
      {ativaModal === 'confirmUpdate' && idToUpdate && 
      <Confirm
        mensagem="Deseja Alterar este produdo?"
        id={idToDelete}
        nomeProd={nomeProd}
        table='produto'
        setProdutos={setProdutos}
      />}
    </div>
  )
}

export default MeusProdutos
