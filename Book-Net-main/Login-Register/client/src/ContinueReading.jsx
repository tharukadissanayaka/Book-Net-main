import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import './Home.css';

function ContinueReading() {
  const { id } = useParams(); // book ID from URL
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);

  const email = localStorage.getItem("userEmail"); // current user email

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/newbooks/${id}`)
        .then(res => setBook(res.data))
        .catch(err => console.error(err));
    } else {
      axios.get("http://localhost:3001/newbooks")
        .then(res => setBooks(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

 if (id && book) {
  return (
    <div>
      <NavBar activePage="readinglist" />
      <div className="continue-reading-container">
        <div className="continue-reading-left">
          <img src={book.image} alt={book.title} />
        </div>
        <div className="continue-reading-right">
          <h2>{book.title}</h2>
          <p className="chapter">Chapter: {book.chapter}</p>
          <div style={{ whiteSpace: "pre-line" }}>
            {book.content}
          </div>
        </div>
      </div>
    </div>
  );
}


  return (
    <div>
      <NavBar activePage="readinglist" />
      <div className="home-container">
        <h2>Continue Reading</h2>
        <div className="book-row">
          {books.map((b) => (
            <div key={b._id} className="book-popular-card">
              <img src={b.image} alt={b.title} />
              <div className="popular-info">
                <h4>{b.title}</h4>
                <p>By {b.author}</p>
                <p className="votes">⭐ 4.5 | {b.votes || "0 votes"}</p>
                <p className="desc">{b.content.substring(0, 100)}...</p>
                <p><b>Rs.{b.price}</b></p>
                <button
                  className="buy-btn"
                  onClick={() => {
                    if (!email) {
                      alert("Please log in first!");
                      navigate("/login");
                      return;
                    }
                    localStorage.setItem(`lastReadBookId_${email}`, b._id); // per-user last-read
                    navigate(`/continue-reading/${b._id}`);
                  }}
                >
                  Read
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContinueReading;






