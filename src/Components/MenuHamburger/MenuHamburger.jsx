import { useState } from "react"
import "./MenuHamburger.css"
const MenuHamburger =()=>{
 const [menuAtivo , setMenuAtivo] = useState(true)

 if(menuAtivo)
  return(
    <img className="menuHamburger"  src="./images/menu.svg" alt="menu"  onClick={()=>{setMenuAtivo(false)}}/>
      )
if(menuAtivo === false)
  return(
    <img className="menuHamburgerClose"  src="./images/close.svg" alt="menu" onClick={()=>{setMenuAtivo(true)}} />
    )
  
  

}
export default MenuHamburger