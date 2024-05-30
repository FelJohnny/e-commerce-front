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
        <li><Link to='perfil/meus_dados'>Meu Perfil</Link></li>
        <li><Link to='perfil/produtos'> Meus Produtos</Link></li>
        {/* {userAuth.rule === 3 && <li onClick={()=>navigate('/adm')}>Painel de Controle</li>} */}
        <li onClick={logout}>Sair</li>
      </ul>
    </nav>
  );
};

export default ModalHeaderOptions;
