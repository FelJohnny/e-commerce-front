import React, { useContext, useEffect } from 'react'
import styles from './Header.module.css'
import { GlobalContext } from '../../Context/GlobalContext';
import { jwtDecode } from 'jwt-decode';
import { GET_AUTH_USER } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';
const Header = () => {
  const { setAtivaModal, setUserAuth,userAuth, popUp, setPopUp, logout} = useContext(GlobalContext);

  const { data, loading, setLoading, error, request,setError, } = useFetch();

  //valida token
  useEffect(() => {
    async function fetchValidaToken() {
      const token = window.localStorage.getItem("token");
      console.log(token);
      if (token) {
        try {
          const { id } =  jwtDecode(token);
          if(id){
            const { url, options } = GET_AUTH_USER(token,id);
            const { response, json } = await request(url, options);
            if (response.ok) {
              setUserAuth({ token, usuario: json, status: true });
            } else {
              logout();
            }
          }else{
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

  return (
    <header>
      <nav className={`${styles.nav}`}>
        <h3>Store Happy Mongose</h3>
        <input type="text" placeholder='Busque seu jogo aqui'/>
        {!userAuth.status ? <button onClick={()=> setAtivaModal('login')}>Entrar</button>: <p>{userAuth.usuario.nome_completo}</p>}
      </nav>
    </header>
  )
}

export default Header
