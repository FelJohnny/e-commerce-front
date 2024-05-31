import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ModalCadastroUsuario.module.css";
import useForm from "../../../Hooks/useForm.jsx";
import useFetch from "../../../Hooks/useFetch";
import { POST_REGISTER} from "../../../Api/api";
import { GlobalContext } from "../../../Context/GlobalContext.jsx";
import InputForm from "../../Inputs/InputText/InputForm.jsx";
import Loading from "../../Loading/Loading.jsx"

const CadastroUsuario = () => {
  const { setPopUp,ativaModal, setAtivaModal } = useContext(GlobalContext);
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const modalContainerCadUsuario = useRef(null);
  const btnClose = useRef(null)
  const nameForm = useForm();
  const emailForm = useForm("email");
  const senhaForm = useForm("senha");

  const { request, data, loading, error,setError } = useFetch();

  function closeModal(event) {
    event.preventDefault()
    if(event.target == modalContainerCadUsuario.current || event.target == btnClose.current){
      setAtivaModal('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    //valida todos os campos
    if (
      nameForm.validate() &&
      emailForm.validate() &&
      senhaForm.validate()
    ) {
      const dataUsuario = {
        nome_completo: nameForm.value,
        email: emailForm.value,
        senha: senhaForm.value,
        rule_id: 1,
      };

      async function postUser() {
        const { url, options } = POST_REGISTER(dataUsuario);
        console.log(options);
        const { response } = await request(url, options);
        if (response.ok) {
          console.log('cadastro criado');
          nameForm.reset();
          emailForm.reset();
          senhaForm.reset();
          setPopUp({
            status:true,
            color: "#46bba2",
            children: "Cadastro realizado com sucesso"
          });
          setAtivaModal('')
          setTimeout(()=>{
            setPopUp({
              status:false,
              color: "",
              children: ""
            })
          },1000)
        }else{
        console.log(response);
          
        }
      }
      postUser();
    } else {
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

  if(ativaModal === 'cadastroUsuario')
  return (
    <div  ref={modalContainerCadUsuario} onClick={closeModal} className={styles.containerModal}>
      <form  className={styles.modal}>
        <button ref={btnClose} onClick={closeModal} className={styles.close}>X</button>
        <h1>Cadastre-se</h1>
        <InputForm
                label="Nome Completo*"
                type="text"
                id="nome"
                placeholder="João de Souza"
                gridColumn="1/4"
                {...nameForm}
              />
              <InputForm
                label="Email*"
                type="email"
                id="email"
                placeholder="joao@email.com"
                gridColumn="1/2"
                {...emailForm}
              />
              <InputForm
                label="Senha*"
                type="password"
                id="password"
                gridColumn="2/4"
                {...senhaForm}
              />
              <p
                className={styles.possuiConta}
                onClick={() => {
                  setAtivaModal("login");
                }}
              >
                Ja possuo uma conta
              </p>
              <button onClick={handleSubmit} className={styles.btn}>
                {loading ? "Salvando..." : "Salvar"}
              </button>
              
      </form>
    </div>
  );
};

export default CadastroUsuario;
