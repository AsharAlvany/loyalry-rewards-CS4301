import React, { useEffect, useState } from 'react';
import './index.css';
import App from './App';
import Shop from './Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import ShoppingCart from './ShoppingCart';

export default function Wrapper(){
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState([]);
    useEffect(() => {
      console.log(cartCount)
      console.log(cart)
    }, [cartCount]);
    function addToCart(id, name, price, image) {
      const existingItemIndex = cart.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        setCartCount(oldVal => oldVal++)
      } else {
        const cartItem = { id, name, price, image, quantity: 1 };
        setCart(arr => [...arr, cartItem])
      }
    }
    return(
        <Router>
            <NavBar cartCount={cartCount}/>
            <Routes>
                <Route exact path="/" element={<Shop cartCount={cartCount} cart={cart} setCart={setCart} setCartCount={setCartCount} addToCart={addToCart}/>} />
                    <Route
                        path="/ShoppingCart"
                        element={<ShoppingCart cartItems={cart} setCartItems={setCart} />}
                    />
            </Routes>
        </Router>    
    )
}
