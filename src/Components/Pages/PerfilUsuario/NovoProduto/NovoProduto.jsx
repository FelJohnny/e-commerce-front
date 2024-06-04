import React, {useContext, useState} from 'react'
import styles from './NovoProduto.module.css'
import {GlobalContext} from '../../../../Context/GlobalContext.jsx'
import Loading from '../../../Loading/Loading.jsx'
import InputForm from '../../../Inputs/InputText/InputForm.jsx'
import useForm from '../../../../Hooks/useForm.jsx'
import ImagemForm from '../../../ImagemForm/ImagemForm.jsx'
import { POST_DATA_NOVO_PRODUTO } from '../../../../Api/api.js'
import useFetch_FormData from '../../../../Hooks/useFetch_FormData.jsx'
import { useNavigate } from 'react-router-dom'
const NovoProduto = () => {
  const { userAuth,logout,setPopUp } = useContext(GlobalContext);
  const [postImg, setPostImg]= useState()
  const [regexPostImg, setRegexPostImg] = useState(false)
  const navigate = useNavigate();
  const { requestForm,loading } = useFetch_FormData();

  const nome = useForm()
  const preco = useForm()

  async  function handleSubmit(e) {
    e.preventDefault();

    if (postImg === undefined) {
      setRegexPostImg(true)
    }
    if(
      nome.validate()&&
      preco.validate()&&
      postImg !== undefined
    ){
      setRegexPostImg(false)
      const formData = new FormData();
      formData.append('nome', nome.value);
      formData.append('preco', preco.value);
      formData.append('img_produto', postImg);
      formData.append('status', true);
  
      const token = window.localStorage.getItem("token");
      if(token){
      const { url, options } = POST_DATA_NOVO_PRODUTO("produto",token, formData);
      const {response} = await requestForm(url, options); 
      console.log(options);
      if(response.ok){
        setPopUp({
          status:true,
          color: "#46bba2",
          children: "Produto cadastrado com sucesso"
        });
        setTimeout(()=>{
          setPopUp({
            status:false,
            color: "",
            children: ""
          })
        },3000)
        nome.reset();
        preco.reset();
        setPostImg(undefined)
        navigate('/perfil/produtos')

      }else{
        setPopUp({
          status:true,
          color: "#d43328",
          children: "Algum erro inesperado aconteceu,"
        });
        setTimeout(()=>{
          setPopUp({
            status:false,
            color: "",
            children: ""
          })
        },2000)
      }
    }else{
      logout();
      navigate('/')
    }
    }else{
      setPopUp({
        status:true,
        color: "#d43328",
        children: "Preencha corretamente os campos necessarios"
      });
      setTimeout(()=>{
        setPopUp({
          status:false,
          color: "",
          children: ""
        })
      },2000)
    }
  }
  return (
    <div className={styles.Container}>

      <h1>Novo Produto</h1>
      <div>
        {!userAuth.status ?
          <div><Loading/></div>:(
          <form action="" onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
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
            />
            {regexPostImg&& <p className={styles.error}>Insira uma imagem!</p>}

            {!loading ? <button>Cadastrar</button>: <Loading/>}
          </form>
        )}
      </div>
    </div>
  )
}

export default NovoProduto
