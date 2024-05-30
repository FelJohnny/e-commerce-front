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
        <li><Link to='meu_perfil/perfil'>Meu Perfil</Link></li>
        <li><Link to='meu_perfil/servicos'> Meus Produtos</Link></li>
        {/* {userAuth.rule === 3 && <li onClick={()=>navigate('/adm')}>Painel de Controle</li>} */}
        <li onClick={logout}>Sair</li>
      </ul>
    </nav>
  );
};

export default ModalHeaderOptions;
