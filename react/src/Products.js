import React from 'react';
import './App.css'

function Product({ id, name, price, image, addToCart, cart, setCart, setCartCount, cartCount}) {

  return (
    <div className="product-container">
      <img src={image} alt={name} width="350px" height="250px" />
      <h2 className='text-xl font-bold'>Product {id}</h2>
      <p style={{ color: '#000000' }}><b>{name}</b></p>
      <p style={{ color: '#000000' }}><b>${parseFloat(price).toFixed(2)}</b></p>
      <button className="bg-slate-300 border-2 border-black rounded-full" onClick={() => addToCart(id, name, price, image)}>Add to Cart</button>
    </div>
  );
}

function Products({addToCart, cart, setCart, setCartCount, cartCount}) {
  const products = [
    { id: '1', name: 'Iphone 15', price: '799.00', image: 'iphone15.jpg' },
    { id: '2', name: 'LG webOS-6.0 TV', price: '1490.00', image: 'LG-TV.jpg' },
    { id: '3', name: 'Samsung S24', price: '859.99', image: 'samsungS24.jpeg' },
    { id: '4', name: 'Sony WH-1000XM5 Noise Cancelling Headphones', price: '429.99', image: 'sonyWH1000XM5.jpg' },
    { id: '5', name: 'Custom Gaming PC', price: '1299.99', image: 'gamingPC.jpg' },
    { id: '6', name: 'LG 77 inch Smart TV', price: '1799.99', image: 'smartTV.jpg' },
    { id: '7', name: 'Apple Watch Series 8 (GPS + Cellular)', price: '429.00', image: 'appleWatchSeries8.jpg' },
    { id: '8', name: 'Sony PlayStation 5 Digital Edition', price: '399.99', image: 'PlayStation5.jpg' },
    { id: '9', name: 'Samsung Galaxy Z Fold 4', price: '1799.99', image: 'galaxyZFold4.jpg' },
    { id: '10', name: 'Instant Pot Pro Plus 10-Quart Pressure Cooker', price: '129.99', image: 'InstantPot.jpg' },
    { id: '11', name: 'Apple MacBook Pro 16-inch', price: '2399.00', image: 'macbookPro.jpg' },
    { id: '12', name: 'Dell XPS 13', price: '1199.99', image: 'dellXPS.jpg' },
  ];

  return (
    <div className="row" style={{ marginTop: '0px' }}>
      {products.map(product => (
        <Product
        cartCount={cartCount} addToCart={addToCart} cart={cart} setCart={setCart} setCartCount={setCartCount}
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
}

export default Products;