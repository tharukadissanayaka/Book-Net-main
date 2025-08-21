import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import './Home.css';

function Home() {
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleBookClick = (title) => {
    alert(`Clicked on: ${title}`);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const books = {
    popular: [
      {
        title: 'Silence',
        author: 'Delia Owens',
        votes: '35,458 votes',
        image: '/Pictures/Black and Grey Dark Forest Aesthetic Book Cover.png',
      },
      {
        title: 'The girl in the woods',
        author: 'Anthony Doerr',
        votes: '98,268 votes',
        image: '/Pictures/Blue Mystery Girl Woods Novel Book Cover.png',
      },
    ],
    recommended: [
      {
        title: 'Garden',
        author: 'Kevin Kwan',
        votes: '8,268 votes',
        image: '/Pictures/Dark Girl Portrait & Flowers Paper Collage Book Cover.png',
      },
       {
        title: 'In The Fog',
        author: 'Shawn Garcia',
        votes: '3,268 votes',
        image: '/Pictures/Brown and White Thriller Book Cover.png',
      },
       {
        title: 'Eye',
        author: 'Morgan Maxwell',
        votes: '8,990 votes',
        image: '/Pictures/Beige and Red Minimalist Eye Illustration Book Cover.png',
      },
       {
        title: 'Terra Frema',
        author: 'Takehiro Kanegi',
        votes: '5,255 votes',
        image: '/Pictures/Minimalist sci-fi novel book cover.png',
      },
       {
        title: 'Woods',
        author: 'Sebastian Bennett',
        votes: '2,556 votes',
        image: '/Pictures/Gray Brown Minimalist Mysterious Thriller Book Cover.png',
      },
       {
        title: 'Hello Carol',
        author: 'Aaron Loeb',
        votes: '1,920 votes',
        image: '/Pictures/Yellow and Green Illustration Story Tale Book Cover.png',
      },
       {
        title: 'The Robots',
        author: 'Shawn Garcia',
        votes: '3,234 votes',
        image: '/Pictures/Black and White Modern Minimalist Robot Science Fiction Book Cover.png',
      },
      {
        title: 'The Path O f Shadows',
        author: 'Rosa Maria',
        votes: '2,234 votes',
        image: '/Pictures/Purple and  Dark Blue The Path Of Shadows eBook Cover.png',
      },
      /*
      {
        title: 'Venus',
        author: 'Margarita Perez',
        votes: '3,250 votes',
        image: '/Pictures/Red Modern Science Fiction Book Cover.png',
      },
      */
    ],
  };

  return (
    <div className="home-container">
      <NavBar activePage="all" />

      {/* POPULAR SECTION */}
      <section className="section">
        <h2>Popular</h2>
        <div className="book-row">
          {books.popular.map((book, i) => (
            <button
              key={i}
              className="book-popular-card"
              onClick={() => handleBookClick(book.title)}
            >
              <img src={book.image} alt={book.title} />
              <div className="popular-info">
                <h4>{book.title}</h4>
                <p>By {book.author}</p>
                <p className="votes">⭐ 4.5 | {book.votes}</p>
                <p className="desc">
                  This book invites readers into a world of imagination, knowledge, and emotion.
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* RECOMMENDED SECTION */}
      <section className="section">
        <h2>Recommended</h2>
        <div className="book-recommend-row">
          {books.recommended.map((book, i) => (
            <div key={i} className="book-recommend-card">
              <img src={book.image} alt={book.title} />
              <h4>{book.title}</h4>
              <p>4.5 ★ ({book.votes})</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <p><strong>Email:</strong> support@bookstore.com</p>
            <p><strong>Phone:</strong> (+94) 76 380 4350</p>
            <p><strong>Address:</strong> No 123, Main Street, Galle, Sri Lanka</p>
          </div>

          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;




