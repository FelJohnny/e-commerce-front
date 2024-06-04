import styles from "./ModalHeaderOptions.module.css";
import { Link, useNavigate } from "react-router-dom";



const ModalHeaderOptions = () => {

  const navigate = useNavigate()

  function logout() {
    window.localStorage.removeItem('token')
    navigate('/')
    window.location.reload();
  }

  return (
    <nav className={`${styles.containerModal+' '+styles.animationUpButton} `}>
      <ul className={styles.options}>
        <Link to='perfil/meus_dados'><li>Meu Perfil</li></Link>
        <Link to='perfil/produtos'><li> Meus Produtos</li></Link>
        {/* {userAuth.rule === 3 && <li onClick={()=>navigate('/adm')}>Painel de Controle</li>} */}
        <li onClick={logout}>Sair</li>
      </ul>
    </nav>
  );
};

export default ModalHeaderOptions;
