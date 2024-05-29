import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ModalCadastroUsuario.module.css";
import useForm from "../../../Hooks/useForm.jsx";
import useFetch from "../../../Hooks/useFetch";
import { POST_REGISTER} from "../../../Api/api";
import { GlobalContext } from "../../../Context/GlobalContext.jsx";
import InputForm from "../../Inputs/InputText/InputForm.jsx";

const CadastroUsuario = () => {
  const { setPopUp,ativaModal, setAtivaModal } = useContext(GlobalContext);
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const modalContainerPost = useRef(null);
  const CloseContainerPost = useRef(null);
  const nameForm = useForm();
  const emailForm = useForm("email");
  const senhaForm = useForm("senha");

  const { request, data, loading, error } = useFetch();

  function closeModal(event) {
    event.preventDefault();
    if (
      event.target === modalContainerPost.current ||
      event.target === CloseContainerPost.current
    ) {
      setAtivaModal("");
      const overflow = document.querySelector("body");
      overflow.classList.remove("overFlow");
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
        const { url, options } = POST_REGISTER("usuarios", dataUsuario);
        const userRequest = await request(url, options);
        if (userRequest.response.ok) {
          console.log('cadastro criado');
          setStatusCadastro(userRequest.json.message);
          nameForm.reset();
          emailForm.reset();
          senhaForm.reset();
          setPopUp({
            status:true,
            color: "#46bba2",
            children: "Cadastro realizado com sucesso"
          });
        }
      }
      postUser();
    } else {
      setPopUp({
        status:true,
        color: "#d43328",
        children: "Preencha corretamente os campos necessarios"
      });
    }
  }

  if(ativaModal === 'cadastroUsuario')
  return (
    <section
      onClick={closeModal}
      ref={modalContainerPost}
      className={styles.containerModal}
    >
      <form ref={formRef} className={`${styles.containerForm} animation-opacity`}>
        {loading ? (<LoadingCenterComponent />) : (<div className={styles.cadastroUsuario}>
              <div className={styles.header}>
                <button
                  closeModal={closeModal}
                  CloseContainerPost={CloseContainerPost}
                >fechar</button>
              </div>

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

              <span
                className={styles.possuiConta}
                onClick={() => {
                  setAtivaModal("login");
                }}
              >
                Ja possuo uma conta
              </span>
              <button handleSubmit={handleSubmit}>
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          
        )}
      </form>

      {/* {cadastroRealizado && (
        <ModalAlert title="Cadastro Realizado" mensagem="Cadastrar serviço?" />
      )} */}
    </section>
  );
};

export default CadastroUsuario;
