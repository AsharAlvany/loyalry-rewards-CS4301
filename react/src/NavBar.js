import React, { useState, useEffect } from 'react';
import './App.css';
import logo from'../src/logo.png'

function NavBar(props) {

  return (
    <div className="navbar">
    <div className="logo">
      <a href="/"> <img src={logo} alt="Logo" width="200px" /></a>
    </div>
    <nav>
      <ul id="MenuItems">
        <li><a href="/" style={{ color: '#000000', fontWeight: 'bold' }}>Products</a></li>
        <li><a href="ShoppingCart" style={{ color: '#000000', fontWeight: 'bold' }}>Cart ({props.cartCount})</a></li>
      </ul>
    </nav>
  </div>
  );
}

export default NavBar;