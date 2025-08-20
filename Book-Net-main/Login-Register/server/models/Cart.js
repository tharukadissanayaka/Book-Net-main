
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    bookname : String,
    email : String,
    price : String,
    quantity : Number,
    image : String,
})

const Cartmodel = mongoose.model('carts', CartSchema);
module.exports = Cartmodel;