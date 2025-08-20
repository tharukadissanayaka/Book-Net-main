const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },   // renamed from bookname
  author: { type: String, required: true },
  price: { type: Number, required: true },   // number type is better
  image: { type: String, required: true },
  category: { type: String, required: true }
});



const BooksModel = mongoose.model('books', BookSchema);
module.exports = BooksModel;
