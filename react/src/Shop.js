import React, { useState, useEffect } from 'react';
import Products from './Products';
import './App.css';

function Shop(props) {
  // const [cartCount, setCartCount] = useState(0);
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   console.log(cartCount)
  //   console.log(cart)
  // }, [cartCount]);

  // function addToCart(id, name, price, image) {
  //   const existingItemIndex = cart.findIndex(item => item.id === id);
  //   if (existingItemIndex !== -1) {
  //     cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
  //     setCartCount(oldVal => oldVal++)
  //   } else {
  //     const cartItem = { id, name, price, image, quantity: 1 };
  //     setCart(arr => [...arr, cartItem])
  //   }
  // }

  return (
    <div>
      <div className="header">
        <div className="container">
          {/* <div className="navbar">
            <div className="logo">
              <a href="index.html"> <img src="logo.webp" alt="Logo" width="100px" /></a>
            </div>
            <nav>
              <ul id="MenuItems">
                <li><a href="index.html" style={{ color: '#000000', fontWeight: 'bold' }}>Home</a></li>
                <li><a href="product.html" style={{ color: '#000000', fontWeight: 'bold' }}>Electronics Products</a></li>
                <li><a href="account.html" style={{ color: '#000000', fontWeight: 'bold' }}>Account</a></li>
                <li><a href="contact.html" style={{ color: '#000000', fontWeight: 'bold' }}>Contact</a></li>
                <li><a href="cart.html" style={{ color: '#000000', fontWeight: 'bold' }}>Cart ({cartCount})</a></li>
              </ul>
            </nav>
          </div> */}
          <div className="row" style={{ marginTop: '0px' }}>
            <Products cartCount={props.cartCount} addToCart={props.addToCart} cart={props.cart} setCart={props.setCart} setCartCount={props.setCartCount}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;