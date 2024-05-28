import React from 'react'
import styles from './Header.module.css'
const Header = () => {
  return (
    <header>
      <nav className={`${styles.nav}`}>
        <h3>Store Happy Mongose</h3>
        <input type="text" placeholder='Busque seu jogo aqui'/>
        <button>Entrar</button>
      </nav>
    </header>
  )
}

export default Header
