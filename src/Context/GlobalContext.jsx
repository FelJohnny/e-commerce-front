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

  function logout() {
    setUserAuth({
      token: "",
      usuario: null,
      status: false,
      rule: ''
    });
    window.localStorage.removeItem('token')
  }


  const [dataUpdate, setDataUpdate] = useState(null);

  return (
    <GlobalContext.Provider
      value={{  
        ativaModal,
        setAtivaModal,
        userAuth,
        setUserAuth,
        popUp,
        setPopUp,
        logout,
        currentProduto,
        setCurrentProduto,
        dataUpdate,
        setDataUpdate
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
