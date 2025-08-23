import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import NavBar from './NavBar';

function NewBooks() {
  const navigate = useNavigate();
  const [newBooks, setNewBooks] = useState([]);

  // Fetch reading books
  useEffect(() => {
    axios.get("http://localhost:3001/newbooks")
      .then(res => setNewBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRead = (bookId) => {
    navigate(`/continue-reading/${bookId}`);
  };

  return (
    <div className="home-container">
      <NavBar activePage="newbooks" />
      <section className="section">
        <h2>New Books</h2>
        <div className="book-row">
          {newBooks.map((book, i) => (
            <div key={i} className="book-popular-card">
              <img src={book.image} alt={book.title} />
              <div className="popular-info">
                <h4>{book.title}</h4>
                <p>By {book.author}</p>
                <p>Chapter: {book.chapter}</p>
                <p><b>Rs.{book.price}</b></p>
                <button className="buy-btn" onClick={() => handleRead(book._id)}>Read</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NewBooks;

