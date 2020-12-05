import React from 'react';
import Logo from '../assets/images/logo.png';

const Header = () => (
  <header className='header'>
    <img src={Logo} className='header__logo' alt='logo' />
    <h1 className='header__title'>React Stream App</h1>
  </header>
);

export default Header;
