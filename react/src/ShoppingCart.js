import React, { useState, useEffect } from 'react';

function ShoppingCart(props) {

  useEffect(() => {
    // Function to update cart display
    function updateCartDisplay() {
      const cartItemsContainer = document.getElementById('cartItemsContainer');
      const emptyCartMessage = document.getElementById('emptyCartMessage');
      const subTotalElement = document.getElementById('subTotal');

      cartItemsContainer.innerHTML = ''; // Clear the current items
      let subTotal = 0;
      let totalSavings = 0;

      props.cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td><img src="${item.image}" width="50px" height="50px" alt="${item.name} Image"></td>
          <td><input type="number" min="1" value="${item.quantity || 1}" onChange={(e) => updateQuantity(item.id, e.target.value)}></td>
          <td id="subtotalCost_${item.id}">$${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</td>
          <td><button onClick={() => removeItem(item.id)}>Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);

        // Calculate total cost including quantity
        subTotal += parseFloat(item.price) * (item.quantity || 1);
      });

      // Update subtotal and potential savings display
      subTotalElement.textContent = subTotal.toFixed(2);

      // Toggle the display based on cart contents
      if (props.cartItems.length > 0) {
        emptyCartMessage.style.display = 'none';
      } else {
        emptyCartMessage.style.display = 'block';
      }
    }

    // Initial display update
    updateCartDisplay();
  }, [props.cartItems]);

  // Checkout function
  function checkout() {
    if (props.cartItems.length === 0) {
      alert('Shopping cart is empty. Please add items to your cart before checkout.');
    } else {
      alert('Successfully checked out. Redirecting to Home page...');
      props.setCartItems([])

      // Add redirection logic here
    }
  }

  // Update quantity function
  function updateQuantity(id, quantity) {
    const updatedCartItems = props.cartItems.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    props.setCartItems(updatedCartItems);
  }

  // Remove item function
  function removeItem(id) {
    const updatedCartItems = props.cartItems.filter(item => item.id !== id);
    props.setCartItems(updatedCartItems);
  }

  return (
    <div className="shopping-cart">
      <div className="account-page">
        <div className="small-container cart-page">
          <h2>Shopping Cart</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Sub Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="cartItemsContainer"></tbody>
          </table>
          <div className="total-cost-container">
            <h3>Sub Total: $<span id="subTotal">0.0</span></h3>
          </div>
          <div id="savingsContainer">
            <h3>Savings Applied: $<span id="savingsAmount">0.0</span></h3>
          </div>
          <div>
            <h3>Total Cost: $<span id="totalCost">0.0</span></h3>
          </div>
          <p id="emptyCartMessage">Your cart is currently empty.</p>
          <button className="btn" onClick={checkout}>Checkout Now</button>
          <div>
            <input type="checkbox" id="usePointsCheckbox" />
            <label htmlFor="usePointsCheckbox">Redeem Points (You have <span id="userPoints">0</span> points available)</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
