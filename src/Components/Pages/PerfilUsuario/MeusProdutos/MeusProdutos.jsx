import React, { useContext, useEffect, useState } from 'react'
import styles from './MeusProdutos.module.css'
import {GlobalContext} from '../../../../Context/GlobalContext.jsx'
import Loading from '../../../Loading/Loading.jsx'
import {GET_PRODUTOS_POR_USUARIO} from '../../../../Api/api.js'
import useFetch from '../../../../Hooks/useFetch.jsx'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Confirm from '../../../Confirm/Confirm.jsx'


const MeusProdutos = () => {
  
  const { logout, setAtivaModal, ativaModal } = useContext(GlobalContext);
  const {request, loading, error,} = useFetch()
  const [produtos, setProdutos] = useState([])
  const [idToDelete, setIdToDelete] = useState(null);
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

  const confirmDelete = (id, nomeProd) => {
    if(id){
      setIdToDelete(id);
      setNomeProd(nomeProd)
      setAtivaModal("confirmDelete");
    }
  };
  return (
    <div className={styles.MeusProdutos}>
      <div className={styles.cabecalho}>
        <h1>Meus Produtos</h1>
        <button>+ Cadastrar novo produto</button>
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
              <span className={styles.createdAt}>criado em:{produto.createdAt}</span>
              <span className={styles.updatedAt}>ultima atulização:{produto.updatedAt}</span>
              <div className={styles.buttons}>
                <button>Visualizar</button>
                <button>Alterar</button>
                <button onClick={()=>confirmDelete(produto.id, produto.nome)}>Excluir</button>
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
        setAtivaModal={setAtivaModal}
        nomeProd={nomeProd}
        table='produto'
        setProdutos={setProdutos}
      />}
    </div>
  )
}

export default MeusProdutos
