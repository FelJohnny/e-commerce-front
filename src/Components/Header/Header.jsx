import React, { useContext, useEffect } from 'react'
import styles from './Header.module.css'
import { GlobalContext } from '../../Context/GlobalContext';
import { jwtDecode } from 'jwt-decode';
import { GET_AUTH_USER } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';
import Loading from '../Loading/Loading';
const Header = () => {
  const { setAtivaModal, setUserAuth,userAuth, popUp, setPopUp, logout} = useContext(GlobalContext);

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
            console.log('teste');
            stop()
            logout();
          }
        } catch (error) {
          console.log('teste');
          stop()
          logout();
        }
      }else{
        logout();
      }
    }
    fetchValidaToken();
  }, []);

  return (
    <header>
      <nav className={`${styles.nav}`}>
        <h3>Store Happy Mongose</h3>
        <input type="text" placeholder='Busque seu jogo aqui'/>
        {loading&& <Loading/>}
        {!userAuth.status && !loading && <button onClick={()=> setAtivaModal('login')}>Entrar</button>}
        {userAuth.status && !loading && <p>{userAuth.usuario.nome_completo}</p>}
        
      </nav>
    </header>
  )
}

export default Header
