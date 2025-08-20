import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './Admin.css';


function Admin() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", price: "", image: "", category: "kids" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:3001/books/${editingId}`, form)
        .then(() => {
          alert("Book updated!");
          setEditingId(null);
          window.location.reload();
        });
    } else {
      axios.post("http://localhost:3001/books", form)
        .then(() => {
          alert("Book added!");
          window.location.reload();
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/books/${id}`)
      .then(() => {
        alert("Book deleted!");
        window.location.reload();
      });
  };

  return (
    <div className="admin-page">
      {/* Full width navbar */}
      <NavBar activePage="admin" />

      {/* Centered content */}
      <div className="admin-container">
        <h2>Admin Panel</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Book Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
          <input type="text" placeholder="Author" value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} required />
          <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
          <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} required />

          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
            <option value="kids">Kids</option>
            <option value="romantic">Romantic</option>
            <option value="scifi">Sci-Fi</option>
            <option value="thriller">Thriller</option>
            <option value="historical">Historical</option>
            <option value="fantasy">Fantasy</option>
          </select>

          <button type="submit">{editingId ? "Update" : "Add"} Book</button>
        </form>

        <h3>All Books</h3>
        <ul>
           {books.map(book => (
             <li key={book._id}>
               <span>{book.title} - {book.category} (${book.price})</span>
               <div className="actions">
                  <button onClick={() => { setForm(book); setEditingId(book._id); }}>Edit</button>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
               </div>
              </li>
            ))}
        </ul>

      </div>
    </div>
  );
}

export default Admin;

