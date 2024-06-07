import React, { useContext, useEffect, useState } from 'react'
import styles from './Header.module.css'
import { GlobalContext } from '../../Context/GlobalContext';
import { jwtDecode } from 'jwt-decode';
import { GET_AUTH_USER } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';
import Loading from '../Loading/Loading';
import ModalHeaderOptions from '../Modals/ModalHeaderOptions/ModalHeaderOptions';
import ModalLogin from '../Modals/ModalLogin/ModalLogin';
import ModalCadastroUsuario from '../Modals/ModalCadastroUsuario/ModalCadastroUsuario'
import { Link, useNavigate } from "react-router-dom";
import SVG_verMais from '../../../images/verMais.svg'
import SVG_cart from '../../../images/shopping_cart.svg'
import PopUp from '../PopUp/PopUp';
import ModalCarrinho from '../Modals/ModalCarrrinho/ModalCarrinho';
import MenuHamburger from '../MenuHamburger/MenuHamburger';

const Header = () => {
  const { setAtivaModal, ativaModal,setUserAuth,userAuth, popUp, logout, carrinho, setCarrinho, qtdeCarrinho, setQtdeCarrinho} = useContext(GlobalContext);

  const { loading, request } = useFetch();
  const navigate = useNavigate()

  //valida token
  useEffect(() => {
    async function fetchValidaToken() {
      const token = window.localStorage.getItem("token");
      if (token) {
          const { id } =  jwtDecode(token);
          const { url, options } = await GET_AUTH_USER(token,id);
          const { response, json, data } = await request(url, options);
          if (response.ok) {
            setUserAuth({ token: token, usuario: json.retorno, status: true, rule:json.retorno.rule_id });
      
            // Recuperar o carrinho do localStorage
            const carrinhoLocalStorage = window.localStorage.getItem('carrinho');
            if (carrinhoLocalStorage) {
            setCarrinho(JSON.parse(carrinhoLocalStorage));
        }
          } else {
            logout();
          }

      }else{
        logout();
        navigate('/')
      }
    }
    fetchValidaToken();
  }, []);

  function handleClick(){
    setAtivaModal('headerOptions')
    if(ativaModal==='headerOptions'){
      setAtivaModal('')
    }
  }

  useEffect(()=>{
    function calculaQtdeCarrinho(){
      let qtde = 0
      carrinho.forEach(produto=>{
        qtde += produto.quantidade 
        setQtdeCarrinho(qtde)
      })
    }
    calculaQtdeCarrinho()
    console.log(carrinho);
  },[carrinho])
  return (
  <>
    <header>
      <nav className={`${styles.nav}`}>
        <Link to={'/'}><h3>Store Happy Mongose</h3></Link>
        <input type="text" placeholder='Busque seu jogo aqui'/>
        {loading&& <Loading/>}
        {!userAuth.status && !loading && (
          <div className={styles.buttonsWrapper}>
            <button onClick={()=> setAtivaModal('cadastroUsuario')}>Cadastre-se</button>
            <button onClick={()=> setAtivaModal('login')}>Entrar</button>
          <MenuHamburger/>
          </div>
        
        )
      }
        {userAuth.status && !loading && 
          <div className={styles.containerUsuarioLogado}>
            <div className={styles.usuarioLogado} onClick={handleClick}>
              <p>
                Bem Vindo, {userAuth.usuario.nome_completo} 
              </p>
              <img src={SVG_verMais} alt="Ver Mais" className={`${styles.vermais} ${ativaModal === 'headerOptions' ? styles.rotate : ''}`} />
              {ativaModal ==='headerOptions' && <ModalHeaderOptions />}
            </div>
              <div className={styles.containerCart} onClick={()=> setAtivaModal("ModalCarrinho")}>
                <span className={styles.qtdeCart}>{qtdeCarrinho}</span>
                <img src={SVG_cart} alt="cart" className={styles.cart}/>
              </div>
          </div>        
        }
        
      </nav>
    </header>
    <PopUp status={popUp.status} color={popUp.color}>{popUp.children}</PopUp>
    <ModalCadastroUsuario/>
    <ModalLogin/>
    <ModalCarrinho/>
  </>

  )
}

export default Header
