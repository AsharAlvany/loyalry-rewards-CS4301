import React, { useState, useEffect } from 'react';
import "./index.css"

function ShoppingCart(props) {
  const [widthInput, setWidth] = useState(4)
  const [usersPoints, setUsersPoints] = useState([])
  const [users, setUsers] = useState([])
  const [activeUser, setActiveUser] = useState("")
  const [currentPoints, setCurrentPoints] = useState(null)
  const [subTotal, setSubTotal] = useState(0)
  const [redeeming, setRedeeming] = useState(false)
  const [savings, setSavings] = useState(0)

  const redeemPoints = (userId, pointsToRedeem) => {
    fetch(`http://localhost:3030/redeemPoints/${userId}/${parseInt(pointsToRedeem)}`)
    .then(()=>{
      setUsersPoints({
        [userId]: usersPoints.userID - parseInt(pointsToRedeem)
      })
    })
  };
  
  const awardPoints = (userId, pointsToAward) => {
    fetch(`http://localhost:3030/awardPoints/${userId}/${parseInt(pointsToAward)}`)
    .then(()=>{
      setUsersPoints({
        [userId]: usersPoints.userID + parseInt(pointsToAward)
      })
    })
  };
  

  function fetchPoint(user){
    return new Promise((resolve, reject) =>{
      fetch(`http://localhost:3030/getPoints/${user}`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) =>{
        console.log(error)
        reject(error)
      })
    })
  }

  async function fetchPoints(users){
    let pointDict = []
    await Promise.all(
      users.map(async (element) =>{
        let object = {}
        object["id"] = element;
        object["name"] = element;
        object["points"] = await fetchPoint(element);
        pointDict.push(object);
      })
    )
    console.log(pointDict)
    return pointDict;
  }

  function fetchUsers(){
    return new Promise((resolve, reject) =>{
      fetch(`http://localhost:3030/getUsers`)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error)=>{
        console.log(error)
        reject(error)
      })
    })
  }

  useEffect(async () => {
    fetchUsers().then((data) =>{
      setUsers(data)
      return fetchPoints(data)
    })
    .then((points) =>{
      setUsersPoints(points)
    })
  }, [])  

  // useEffect(()=>{
  //   fetchPoint(activeUser)
  //   .then((points)=>{
  //     setCurrentPoints(points)
  //     return ()=>{

  //     }
  //   })
  // }, [activeUser])
  useEffect(()=>{
    console.log(`User: ${activeUser}, Points: ${currentPoints}`)
  }, [currentPoints])

  useEffect(() => {
    function updateCartDisplay() {
      const cartItemsContainer = document.getElementById('cartItemsContainer');
      const emptyCartMessage = document.getElementById('emptyCartMessage');

      let tempSubTotal = 0

      cartItemsContainer.innerHTML = ''; 

      props.cartItems.forEach(item => {
        const row = document.createElement('tr');
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.value = item.quantity || 1;
        input.addEventListener('change', (e) => updateQuantity(item.id, e.target.value));
        
        const button = document.createElement('button');
        button.className = 'btn'
        button.textContent = 'Remove';
        button.addEventListener('click', () => removeItem(item.id));

        const SubTotalPrice = document.createElement('td');
        SubTotalPrice.id = `subtotalCost_${item.id}`
        SubTotalPrice.textContent = `$${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}`

        row.appendChild(document.createElement('td')).textContent = item.name;
        const imageCell = row.appendChild(document.createElement('td'));
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = `${item.name} Image`;
        image.width = 50;
        image.height = 50;
        imageCell.appendChild(image);
        row.appendChild(document.createElement('td')).appendChild(input);
        row.appendChild(SubTotalPrice);
        row.appendChild(document.createElement('td')).appendChild(button);
        
        cartItemsContainer.appendChild(row);

        tempSubTotal += parseFloat(item.price) * (item.quantity || 1);
      });

      setSubTotal(tempSubTotal)

      if (props.cartItems.length > 0) {
        emptyCartMessage.style.display = 'none';
      } else {
        emptyCartMessage.style.display = 'block';
      }
    }

    updateCartDisplay();
  }, [props.cartItems]);

  function checkout() {
    if (props.cartItems.length === 0) {
      alert('Shopping cart is empty. Please add items to your cart before checkout.');
    } else {
      props.setCartItems([])
      if (redeeming && activeUser.length > 0){
        redeemPoints(activeUser.toLowerCase(), savings)
        alert(`Successfully checked out. Redeemed ${savings} points from ${activeUser}. Redirecting to Home page...`);
      }
      else if (activeUser.length > 0){
        awardPoints(activeUser.toLowerCase(), (subTotal * 0.05).toFixed(2))
        alert(`Successfully checked out. Awarded ${activeUser} ${(subTotal * 0.05).toFixed(2)} points. Redirecting to Home page...`);
      }
      else{
        alert('Successfully checked out as guest!')
      }
      window.location.href = '/'
    }
  }

  function updateQuantity(id, quantity) {
    console.log("HIT")
    const updatedCartItems = props.cartItems.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    props.setCartItems(updatedCartItems);
  }

  function HandleInput(e){
    if(e.key === "Enter"){
      if(users.includes(e.target.value.toLowerCase())){
        console.log(e.target.value.toLowerCase())
        setActiveUser(e.target.value.toLowerCase())
        fetchPoint(e.target.value.toLowerCase())
        .then((points) =>{
          setCurrentPoints(points)
        })
      }
      else{
        fetch(`http://localhost:3030/createUser/${e.target.value.toLowerCase()}`)
        .then(()=>{
          setUsers((oldVal) => [...oldVal, e.target.value.toLowerCase()])
          setUsersPoints({
            [e.target.value.toLowerCase()]: 0
          })
          setActiveUser(e.target.value.toLowerCase())
        })
      }
    }
    if(e.target.value.length > 0)
      setWidth(e.target.value.length)
    else
      setWidth(4)

  }

  function removeItem(id) {
    const updatedCartItems = props.cartItems.filter(item => item.id !== id);
    props.setCartItems(updatedCartItems);
    const count = updatedCartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    props.setCartCount(count)
  }

  return (
    <div className="shopping-cart">
      {
        activeUser.length > 0 ? 
        <div style={{fontFamily: "Secrcode"}} className="z-10 bg-slate-300 w-90 flex mt-20 mb-10 mx-40 py-10 rounded-lg shadow-xl align-center justify-center text-3xl transition-all">
          Welcome, {activeUser.charAt(0).toUpperCase() + activeUser.slice(1)}!
      </div>
      :
        <div style={{fontFamily: "Secrcode"}} className="z-10 bg-slate-300 w-90 flex mt-20 mb-10 mx-40 py-10 rounded-lg shadow-xl align-center justify-center text-3xl transition-all">
          Hello,
            <input onKeyUp={(e) =>{HandleInput(e)}} style={{width:`${21*widthInput}px`, fontFamily: "Secrcode"}} className='transition-all rounded-lg text-center animate-pulse placeholder:text-slate-500 bg-slate-400 capitalize flex p-0 ml-3 focus:border-0' placeholder='USER'>
            </input>
        </div>
      }
      <div className="z-0 account-page">
        <div className="small-container cart-page">
          <h2>Shopping Cart</h2>
          <table>
            <thead>
              <tr>
                <th className='text-center'>Product</th>
                <th className='text-center'>Image</th>
                <th className='text-center'>Quantity</th>
                <th className='text-center'>Sub Total Price</th>
                
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody id="cartItemsContainer"></tbody>
          </table>
          <div className="total-cost-container mt-10">
            <h3>Sub Total: ${subTotal.toFixed(2)}</h3>
          </div>
          <div  className="my-5" id="savingsContainer">
            <h3>Savings Applied: ${savings.toFixed(2)}</h3>
          </div>
          <div className="my-5" >
            <h3>Total Cost: ${(subTotal - savings).toFixed(2)}</h3>
          </div>
          <p  className="my-5" id="emptyCartMessage">Your cart is currently empty.</p>
          <button className="btn" onClick={checkout}>Checkout Now</button>
          {
            currentPoints > 0 ?
            <button onClick={() => {setRedeeming(true);setSavings(Math.min(currentPoints, subTotal))}} className="btn ml-5">
              Redeem {currentPoints} Points
            </button>
            :
            <button disabled={true} className="dis-btn ml-5">
            Redeem {} Points
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
