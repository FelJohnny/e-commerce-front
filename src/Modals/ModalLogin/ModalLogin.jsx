import style from './ModalLogin.module.css'
import { GlobalContext } from '../../Context/GlobalContext.jsx'
import React, { useContext, useRef, useState } from 'react'
import useForm from '../../Hooks/useForm.jsx'
import {GET_AUTH_USER, POST_LOGIN} from '../../Api/api.js'
import InputForm from '../../Components/Inputs/InputText/InputForm.jsx'
import { jwtDecode } from 'jwt-decode'
import useFetch from '../../Hooks/useFetch.jsx'



const ModalLogin = () => {
  const { data, loading, setLoading, error, request,setError } = useFetch();
  const [token, setToken] = useState(null);
  const { ativaModal, setAtivaModal,userAuth, setUserAuth,popUp, setPopUp} = useContext(GlobalContext);
  const modalLoginContainer = useRef(null)
  const btnClose = useRef(null)
  const emailuser = useForm('email');
  const password = useForm('senha');

  function closeModal(event){
    event.preventDefault()
    if(event.target == modalLoginContainer.current || event.target == btnClose.current){
      setAtivaModal('')
    }
  }

  function handleSubmit(){
    if (emailuser.validate() && password.validate() == true){
      const dataLogin={
        email: emailuser.value,
        senha: password.value,
      }

      async function postLogin(){
        const { url, options } = POST_LOGIN(dataLogin)
        const requestLogin = await request(url,options)
        if(requestLogin.response.ok){
          setLoading(true)
          const token = requestLogin.json.token
          setToken(token)
          authLogin(token)
          window.localStorage.setItem("token", token);
        }else{
          setToken(null)
        }
      }

      async function authLogin(token) {
        const { id } = await jwtDecode(token);
        const { url, options } = GET_AUTH_USER(token, id);
        const { response, json } = await request(url, options);
        if(!response.ok){
          setError("token expirado")
          setUserAuth({ token: "", usuario: null, status: false,rule:'' });
        }else{
          setUserAuth({ token: token, usuario: json.retorno, status: true, rule:json.retorno.rule_id });
          setPopUp({
            status:true,
            children:`Bem Vindo ${json.retorno.nome_completo}`,
            color:'#46bba2',
          });
          setAtivaModal('');
          setTimeout(() => {
            setPopUp(false)
          }, 3000);

        }
      }
      postLogin();
    }
  }

  if(ativaModal === 'login')
  return (
  <div  ref={modalLoginContainer} onClick={closeModal} className={style.containerModal}>
      <form  className={style.modal}>
        <button ref={btnClose} onClick={closeModal} className={style.close}>X</button>
        <h1>Faça Login</h1>
        <InputForm
          label={"E-mail: "}
          name={"emailuser"}
          type={"text"}
          {...emailuser}
        />
        <InputForm
          label={"Senha: "}
          name={"nome"}
          type={"password"}
          {...password}
        />
        <div className={style.options}>
        <p>Esqueci a senha</p>
        <p onClick={()=> setAtivaModal('cadastro')}>Não possuo uma conta</p>
        </div>
        {error&&<span>{error}</span>}
        <button className={style.btn} onClick={handleSubmit}>{loading? 'carregando...':'Entrar'}</button>

      </form>
  </div>
  )
}

export default ModalLogin
