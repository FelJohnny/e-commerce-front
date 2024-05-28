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

  function logout() {
    setUserAuth({
      token: "",
      usuario: null,
      status: false,
      rule: ''
    });
    window.localStorage.removeItem('token')
  }


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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
