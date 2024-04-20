import React, { useEffect, useState } from 'react';
import './index.css';
import Shop from './Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import ShoppingCart from './ShoppingCart';

export default function Wrapper(){
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState([]);    
    useEffect(() => {
      const tempCart = JSON.parse(localStorage.getItem('cart')) || []
      if (tempCart.length > 0){
        setCart(tempCart)
        const count = JSON.parse(localStorage.getItem('cart')).reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(count); 
      }
    }, []);
    useEffect(() => {
      console.log(cartCount)
      console.log(cart)
      console.log(JSON.parse(localStorage.getItem('cart')))
    }, [cartCount]);
    useEffect(()=>{
      if (cart.length > 0 )
        localStorage.setItem('cart', JSON.stringify(cart))

      if (cart.length == 0)
        localStorage.removeItem('cart')

    }, [cart])
    function addToCart(id, name, price, image) {
      const existingItemIndex = cart.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
      } else {
        const cartItem = { id, name, price, image, quantity: 1 };
        setCart(arr => [...arr, cartItem])
      }
      setCartCount(cartCount + 1)
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    return(
        <Router>
            <NavBar cartCount={cartCount}/>
            <Routes>
                <Route exact path="/" element={<Shop cartCount={cartCount} cart={cart} setCart={setCart} setCartCount={setCartCount} addToCart={addToCart}/>} />
                    <Route
                        path="/ShoppingCart"
                        element={<ShoppingCart setCartCount={setCartCount} cartItems={cart} setCartItems={setCart} />}
                    />
            </Routes>
        </Router>    
    )
}
