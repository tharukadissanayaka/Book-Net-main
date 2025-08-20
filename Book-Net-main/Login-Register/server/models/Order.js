const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  bookname: String,
  email: String,
  price: String,
  quantity: Number,
  image: String,
  orderDate: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model('orders', OrderSchema);
module.exports = OrderModel;
