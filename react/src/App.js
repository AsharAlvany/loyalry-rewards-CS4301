import React, { useState, useEffect } from 'react';

const App = () => {
  // Sample user data
  const initialUsers = [
    { id: 1, name: 'John', points: 100 },
    { id: 2, name: 'Jane', points: 150 },
    { id: 3, name: 'Doe', points: 200 },
  ];
  const [users, setUsers] = useState(initialUsers);
  const [reload, setReload] = useState(true);
  const [inputVal, setInputVal] = useState();
  const [cartItems, setCartItems] = useState([]);

  async function fetchUsersWithPoints() {
    try {
      const response = await fetch(`http://localhost:3030/getUsers`);
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
      }
      const userData = await response.json();
      if (typeof userData !== 'object' || userData === null) {
        throw new Error("Invalid JSON response from server");
      }

      const updatedUsers = await Promise.all(
        userData.map(async (user) => {
          const points = await fetchPoints(user.id);
          return { ...user, points };
        })
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error gracefully in your component (e.g., display an error message)
    }
  }

  async function fetchPoints(userId) {
    try {
      const response = await fetch(`http://localhost:3030/getPoints/${userId}`);
      if (!response.ok) {
        throw new Error(`Error fetching points for user ${userId}`);
      }
      const points = await response.json();
      return points;
    } catch (error) {
      console.error("Error fetching points:", error);
      // Handle error gracefully in your component
    }
  }

  useEffect(() => {
    fetchUsersWithPoints();
  }, [reload]);

  const handleRedeemPoints = (userId, pointsToRedeem) => {
    fetch(`http://localhost:3030/redeemPoints/${userId}/${pointsToRedeem}`)
      .then(() => setReload(!reload)); // Trigger refetch on success
  };

  const handleAwardPoints = (userId, pointsToAward) => {
    fetch(`http://localhost:3030/awardPoints/${userId}/${pointsToAward}`)
      .then(() => setReload(!reload)); // Trigger refetch on success
  };

  const handleCreateUser = async () => {
    // Validate and sanitize user input before making the request
    if (!inputVal) {
      return; // Handle empty input
    }
    const sanitizedInput = inputVal.trim(); // Basic sanitization example

    try {
      const response = await fetch(`http://localhost:3030/createUser/${sanitizedInput}`);
      if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
      }
      setInputVal(""); // Clear input field
      setReload(!reload); // Trigger refetch on success
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error gracefully in your component (e.g., display an error message)
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      handleCreateUser();
    }
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
};

export default App;