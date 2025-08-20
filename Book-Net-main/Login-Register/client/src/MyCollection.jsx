import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyCollection.css';
import NavBar from './NavBar'; // Import NavBar for consistent navigation

function MyCollection() {
  const [cartItems, setCartItems] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:3001/cart/${email}`)
        .then(res => setCartItems(res.data))
        .catch(err => console.error(err));
    }
  }, [email]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item._id !== id));
      })
      .catch(err => console.error(err));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  );

const handleConfirmOrder = () => {
  if (!email) return alert("You need to login first");

  axios.post('http://localhost:3001/order/confirm', { email })
    .then(() => {
      setCartItems([]); // Clear cart visually on frontend only
      alert("Order confirmed! Thank you for your purchase.");
    })
    .catch(err => {
      console.error(err);
      alert("Error confirming order. Please try again.");
    });
};



  return (
    <div className="mycollection-container">
      <NavBar activePage="cart" />
      <h2 className="mycollection-title">My Collection (Cart)</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.bookname} />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.bookname}</h4>
                  <p className="cart-item-price">
                    ${item.price} | Qty: {item.quantity}
                  </p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="cart-btn remove"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
           <div className="confirm-order-container">
             <button className="cart-btn confirm" onClick={handleConfirmOrder}>
                Confirm Order
            </button>
           </div>
        </>
      )}
    </div>
  );
}

export default MyCollection;

