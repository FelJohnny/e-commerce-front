import React, {useContext, useEffect, useState} from 'react'
import styles from './AlterarProduto.module.css'
import {GlobalContext} from '../../../../Context/GlobalContext.jsx'
import Loading from '../../../Loading/Loading.jsx'
import InputForm from '../../../Inputs/InputText/InputForm.jsx'
import useForm from '../../../../Hooks/useForm.jsx'
import ImagemForm from '../../../ImagemForm/ImagemForm.jsx'
import { POST_DATA_NOVO_PRODUTO } from '../../../../Api/api.js'
import useFetch_FormData from '../../../../Hooks/useFetch_FormData.jsx'
import { useNavigate } from 'react-router-dom'
const AlterarProduto = () => {
  const { userAuth,logout,setPopUp,dataUpdate } = useContext(GlobalContext);

  const [postImg, setPostImg]= useState()
  const [regexPostImg, setRegexPostImg] = useState(false)
  const navigate = useNavigate();
  const { requestForm,loading } = useFetch_FormData();

  const nome = useForm()
  const preco = useForm()
  const [imageExistente, setImageExistente]=useState(null)

  useEffect(()=>{
    nome.setValue(dataUpdate.nome)
    preco.setValue(dataUpdate.preco)
    async function urlToBlob(url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
         reader.readAsDataURL(blob);
         reader.onload = () => {
          setImageExistente(reader.result)
         }
      } catch (error) {
        console.error('Erro ao obter o Blob:', error);
        return null;
      }
    }
    urlToBlob(dataUpdate.url_img_produto)


    
    
  },[])

  
  return (
    <div className={styles.Container}>

      <h1>Alteração do produto: {dataUpdate.nome}</h1>
      <div>
        {!userAuth.status ?
          <div><Loading/></div>:(
          <form action="" className={styles.form} encType="multipart/form-data">
            <InputForm 
              label="Nome do Jogo" 
              name="nome"
              type="text" 
              {...nome}
            />
            <InputForm 
              label="Preço" 
              name="preco" 
              type="number" 
              {...preco}
            />
             <ImagemForm 
              label="Imagem" 
              name="imagem" 
              setPostImg={setPostImg}
              setRegexPostImg={setRegexPostImg}
              imageExistente={imageExistente}
            />
            {regexPostImg&& <p className={styles.error}>Insira uma imagem!</p>}

            {!loading ? <button>Cadastrar</button>: <Loading/>}
          </form>
        )}
      </div>
    </div>
  )
}

export default AlterarProduto
