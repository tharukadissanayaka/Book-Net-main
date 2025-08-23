const mongoose = require('mongoose');

const ReadingBookSchema = new mongoose.Schema({
  title: { type: String, required: true },   // renamed from bookname
  author: { type: String, required: true },
  price: { type: Number, required: true },   // number type is better
  image: { type: String, required: true },
  chapter: { type: String, required: true },
  content: { type: String, required: true }
});



const ReadingBooksModel = mongoose.model('readingbooks', ReadingBookSchema);
module.exports = ReadingBooksModel;