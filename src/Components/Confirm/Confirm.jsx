import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Confirm.module.css";
import { DELETE_DATA, GET_PRODUTOS_POR_USUARIO } from "../../Api/api.js";
import useFetch from "../../Hooks/useFetch";
import { GlobalContext } from "../../Context/GlobalContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loading from "../Loading/Loading.jsx";

const Confirm = ({ mensagem, id, table,nomeProd,setProdutos}) => {
  const { request, loading } = useFetch();
  const modalConfirm = useRef(null)
  const { setPopUp,ativaModal, setAtivaModal } = useContext(GlobalContext);
  const navigate = useNavigate();


  function closeModal(event){
    event.preventDefault()
    if(event.target == modalConfirm.current){
      setAtivaModal('')
    }
  }
  async function handleDelete() {
    const token = window.localStorage.getItem("token");
    async function deleteData() {
      if (token && id) {
        const { url, options } = DELETE_DATA(table, id, token);
        const { response } = await request(url, options);
        if (response.ok) {
          setAtivaModal('')
          setPopUp({
            status:true,
            color: "#46bba2",
            children: "Produto excluido com sucesso"
          })
          setTimeout(() => {
            setPopUp({
              status:false,
              color: "",
              children: ""
            })
          }, 3000);
          const token = window.localStorage.getItem("token");
          if(token){
            const { id } = jwtDecode(token);
            const {url, options} = GET_PRODUTOS_POR_USUARIO(id, token)
            const {response, json} = await request(url, options)
            if(response.ok){
              setProdutos(json.produtos)
            }else{
              setAtivaModal('')
              setPopUp({
                status:true,
                color: "#c04c30",
                children: "Não foi possivel excluir esse registro"
              })
              setTimeout(() => {
                setPopUp({
                  status:false,
                  color: "",
                  children: ""
                })
              }, 3000);
            }
          }else{
            navigate('/')
          }
        }else{
          setAtivaModal('')
          setPopUp({
            status:true,
            color: "#c04c30",
            children: "Não foi possivel excluir esse registro"
          })
          setTimeout(() => {
            setPopUp({
              status:false,
              color: "",
              children: ""
            })
          }, 3000);
        }
      } else {
        navigate('/')
      }
    }
    deleteData();
  }

  return (
    <div ref={modalConfirm} className={styles.modalContainer} onClick={closeModal}>
      <div className={styles.modal} >
        <h1>{mensagem}</h1>
        <p>Nome: {nomeProd}</p>
        {loading ?<Loading/>: 
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => setAtivaModal('')}
          >
            Voltar
          </button>
          {ativaModal ==='confirmDelete'&&<button
            className={styles.btnDelete}
            type="button"
            onClick={handleDelete}
          >
            Deletar
          </button>}
          {ativaModal ==='confirmUpdate'&& 
          <Link to={"altera"}>
            <button
              className={styles.btnUpdate}
              type="button"
              >
              Sim
            </button>
          </Link>}
      
        </div>}
      </div>
    </div>
  );
};


export default Confirm;
