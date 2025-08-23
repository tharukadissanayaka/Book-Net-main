import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import NavBar from './NavBar';

function Historical() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const [historicalBooks, setHistoricalBooks] = useState([]);

  // ✅ Fetch kids books from backend
  useEffect(() => {
    axios.get("http://localhost:3001/books?category=historical")
      .then(res => setHistoricalBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBuy = (book) => {
    if (!email) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    axios.post("http://localhost:3001/cart", {
      bookname: book.title,
      email: email,
      price: book.price,
      quantity: 1,
      image: book.image
    })
    .then(() => alert("Book added to cart!"))
    .catch(err => {
      console.error(err);
      alert("Error adding to cart");
    });
  };

  return (
    <div className="home-container">
      <NavBar activePage="historical" />
      <section className="section">
        <h2>Historical Section</h2>
        <div className="book-row">
          {historicalBooks.map((book, i) => (
            <div key={i} className="book-popular-card">
              <img src={book.image} alt={book.title} />
              <div className="popular-info">
                <h4>{book.title}</h4>
                <p>By {book.author}</p>
                <p className="votes">⭐ 4.5 | {book.votes || "0 votes"}</p>
                <p className="desc">{book.description || "No description"}</p>
                <p><b>Rs.{book.price}</b></p>
                <button className="buy-btn" onClick={() => handleBuy(book)}>Buy</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Historical;
