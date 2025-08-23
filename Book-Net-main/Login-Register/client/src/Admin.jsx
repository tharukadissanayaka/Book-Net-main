import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "./Admin.css";

function Admin() {
  const [activeTab, setActiveTab] = useState("selling"); // "selling" or "reading"

  // State for selling books
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    category: "kids",
  });
  const [editingId, setEditingId] = useState(null);

  // State for reading books
  const [readingBooks, setReadingBooks] = useState([]);
  const [readingForm, setReadingForm] = useState({
   title: "",
   author: "",
   price: "",
   image: "",
   chapter: "",   // <-- added
   content: "",
});

  const [readingEditingId, setReadingEditingId] = useState(null);

  // Fetch selling books
  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch reading books
  useEffect(() => {
    axios
      .get("http://localhost:3001/newbooks")
      .then((res) => setReadingBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Submit handler for selling books
  const handleSubmitSelling = (e) => {
    e.preventDefault();
    if (editingId) {
      axios
        .put(`http://localhost:3001/books/${editingId}`, form)
        .then(() => {
          alert("Selling Book updated!");
          setEditingId(null);
          window.location.reload();
        });
    } else {
      axios.post("http://localhost:3001/books", form).then(() => {
        alert("Selling Book added!");
        window.location.reload();
      });
    }
  };

  // Submit handler for reading books
  const handleSubmitReading = (e) => {
    e.preventDefault();
    if (readingEditingId) {
      axios
        .put(
          `http://localhost:3001/newbooks/${readingEditingId}`,
          readingForm
        )
        .then(() => {
          alert("Reading Book updated!");
          setReadingEditingId(null);
          window.location.reload();
        });
    } else {
      axios.post("http://localhost:3001/newbooks", readingForm).then(() => {
        alert("Reading Book added!");
        window.location.reload();
      });
    }
  };

  const handleDeleteSelling = (id) => {
    axios.delete(`http://localhost:3001/books/${id}`).then(() => {
      alert("Selling Book deleted!");
      window.location.reload();
    });
  };

  const handleDeleteReading = (id) => {
    axios.delete(`http://localhost:3001/newbooks/${id}`).then(() => {
      alert("Reading Book deleted!");
      window.location.reload();
    });
  };

  return (
    <div className="admin-page">
      {/* Full width navbar */}
      <NavBar activePage="admin" />

      <div className="admin-container">
        <h2>Admin Panel</h2>

        {/* Top Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "selling" ? "active" : ""}
            onClick={() => setActiveTab("selling")}
          >
            Selling Books
          </button>
          <button
            className={activeTab === "reading" ? "active" : ""}
            onClick={() => setActiveTab("reading")}
          >
            Reading Books
          </button>
        </div>

        {/* SELLING BOOKS PANEL */}
        {activeTab === "selling" && (
          <>
            <form onSubmit={handleSubmitSelling}>
              <input
                type="text"
                placeholder="Book Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />
            
              <input
                type="text"
                placeholder="Author"
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                required
              />

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="kids">Kids</option>
                <option value="romantic">Romantic</option>
                <option value="scifi">Sci-Fi</option>
                <option value="thriller">Thriller</option>
                <option value="historical">Historical</option>
                <option value="fantasy">Fantasy</option>
              </select>

              <button type="submit">
                {editingId ? "Update" : "Add"} Book
              </button>
            </form>

            <h3>All Selling Books</h3>
            <ul>
              {books.map((book) => (
                <li key={book._id}>
                  <span>
                    {book.title} - {book.category} (Rs.{book.price})
                  </span>
                  <div className="actions">
                    <button
                      onClick={() => {
                        setForm(book);
                        setEditingId(book._id);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteSelling(book._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* READING BOOKS PANEL */}
        {activeTab === "reading" && (
          <>
            <form onSubmit={handleSubmitReading}>
              <input
                type="text"
                placeholder="Book Title"
                value={readingForm.title}
                onChange={(e) =>
                  setReadingForm({ ...readingForm, title: e.target.value })
                }
                required
              />
                          {/* New Chapter Bar */}
              <input
                type="text"
                placeholder="Chapter"
                value={readingForm.chapter}
                onChange={(e) =>
                setReadingForm({ ...readingForm, chapter: e.target.value })
                }
                required
              /> 
              <input
                type="text"
                placeholder="Author"
                value={readingForm.author}
                onChange={(e) =>
                  setReadingForm({ ...readingForm, author: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={readingForm.price}
                onChange={(e) =>
                  setReadingForm({ ...readingForm, price: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={readingForm.image}
                onChange={(e) =>
                  setReadingForm({ ...readingForm, image: e.target.value })
                }
                required
              />

              {/* Larger textarea for book content */}
              <textarea
                placeholder="Book Content"
                value={readingForm.content}
                onChange={(e) =>
                  setReadingForm({ ...readingForm, content: e.target.value })
                }
                required
              ></textarea>

              <button type="submit">
                {readingEditingId ? "Update" : "Add"} Book
              </button>
            </form>

            <h3>All Reading Books</h3>
            <ul>
              {readingBooks.map((book) => (
                <li key={book._id}>
                  <span>
                    {book.title} - (Rs.{book.price})
                  </span>
                  <div className="actions">
                    <button
                      onClick={() => {
                        setReadingForm(book);
                        setReadingEditingId(book._id);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteReading(book._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;


