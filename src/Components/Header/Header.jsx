import React from 'react'
import styles from './Header.module.css'
const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <h3>Store-happy-Mongose</h3>
        <input type="text" />
        <input type="button" value="logar"/>
      </nav>
    </header>
  )
}

export default Header
