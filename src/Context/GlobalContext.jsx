import { createContext, useState } from "react";


export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {

  const [popUp, setPopUp] =useState({
    status:false,
    color: "",
    children: ""
  })

  const [ativaModal, setAtivaModal] = useState('')

  const [userAuth, setUserAuth] = useState({
    token: "",
    usuario: null,
    status: false,
    rule: ''
  });

  const [currentProduto, setCurrentProduto]=useState({
    id: null,
    nome: null,
    preco: null,
    status: null,
    capa_produto:null,
    url_img_produto:null,
  })

  const [carrinho, setCarrinho] = useState([])
  
  function logout() {
    setUserAuth({
      token: "",
      usuario: null,
      status: false,
      rule: ''
    });
    window.localStorage.removeItem('token')
  }

  const [quantidade, setQuantidade] = useState(1);

  //===========NECESSARIO PARA RENDERIZAR DADOS PARA ALTERAÇÃO
  const [dataUpdate, setDataUpdate] = useState(null);

  return (
    <GlobalContext.Provider
      value={{  
        currentProduto, setCurrentProduto,
        ativaModal, setAtivaModal,
        dataUpdate, setDataUpdate,
        userAuth, setUserAuth,
        carrinho, setCarrinho,
        quantidade, setQuantidade,
        popUp, setPopUp,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
