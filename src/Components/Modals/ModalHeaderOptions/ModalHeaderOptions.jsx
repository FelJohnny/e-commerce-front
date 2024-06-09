import { useContext, useEffect, useState } from "react";
import styles from "./ModalHeaderOptions.module.css";
import { Link, useNavigate } from "react-router-dom";
import Confirm from "../../Confirm/Confirm";



const ModalHeaderOptions = () => {

  const navigate = useNavigate()
  const [logoutModal, setLogoutModal] = useState(false)

  function logout() {
    setLogoutModal(true)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('carrinho')
    navigate('/')
    window.location.reload();
  }
  return (
    <>
    <nav className={`${styles.containerModal+' '+styles.animationUpButton} `}>
      <ul className={styles.options}>
        <Link to='perfil/meus_dados'><li>Meu Perfil</li></Link>
        <Link to='perfil/produtos'><li> Meus Produtos</li></Link>
        <li onClick={()=>logout()}>Sair</li>
        {/* {userAuth.rule === 3 && <li onClick={()=>navigate('/adm')}>Painel de Controle</li>} */}
      </ul>
    </nav>

    {logoutModal&&
    <Confirm
      mensagem="Deseja Alterar este produdo?"
      id={'idToDelete'}
      nomeProd={'nomeProd'}
      table='produto'
      setProdutos={"setProdutos"}
    />}
    </>
  );
};

export default ModalHeaderOptions;
