import React, { useContext, useEffect } from 'react'
import styles from './Header.module.css'
import { GlobalContext } from '../../Context/GlobalContext';
import { jwtDecode } from 'jwt-decode';
import { GET_AUTH_USER } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';
import Loading from '../Loading/Loading';
import ModalHeaderOptions from '../Modals/ModalHeaderOptions/ModalHeaderOptions';
import ModalLogin from '../Modals/ModalLogin/ModalLogin';
import ModalCadastroUsuario from '../Modals/ModalCadastroUsuario/ModalCadastroUsuario'
import { Link } from "react-router-dom";
import SVG_verMais from '../../../images/verMais.svg'
import PopUp from '../PopUp/PopUp';

const Header = () => {
  const { setAtivaModal, ativaModal,setUserAuth,userAuth, popUp, logout} = useContext(GlobalContext);

  const { data, loading, setLoading, error, request,setError } = useFetch();

  //valida token
  useEffect(() => {
    async function fetchValidaToken() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          const { id } =  jwtDecode(token);
          const { url, options } = await GET_AUTH_USER(token,id);
          const { response, json, data } = await request(url, options);
          if (response.ok) {
            setUserAuth({ token: token, usuario: json.retorno, status: true, rule:json.retorno.rule_id });
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      }else{
        logout();
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
          </div>
        )
      }
        {userAuth.status && !loading && 
          <>
            <div className={styles.usuarioLogado} onClick={handleClick}>
              <p>
                Bem Vindo, {userAuth.usuario.nome_completo} 
              </p>
              <img src={SVG_verMais} alt="Ver Mais" className={`${styles.vermais} ${ativaModal === 'headerOptions' ? styles.rotate : ''}`} />
              {ativaModal ==='headerOptions' && <ModalHeaderOptions />}
            </div>
          </>        
        }
        
      </nav>
    </header>
    <PopUp status={popUp.status} color={popUp.color}>{popUp.children}</PopUp>
    <ModalCadastroUsuario/>
    <ModalLogin/>
  </>

  )
}

export default Header
