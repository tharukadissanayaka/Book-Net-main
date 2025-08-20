const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employeemodel = require('./models/Employee');
const Cartmodel = require('./models/Cart');
const OrderModel = require('./models/Order');
const BooksModel = require('./models/Books');




const app = express();
app.use(express.json());
app.use(cors());

/*
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    Employeemodel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success");
            } else {
                res.json("Incorrect Password");
            }
        }else{
            res.json("User not found");
        }
    });
});
*/

app.post('/register', (req, res) => {
    Employeemodel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
})

// ADD TO CART
app.post('/cart', (req, res) => {
    Cartmodel.create(req.body)
    .then(cartItem => res.json(cartItem))
    .catch(err => res.status(500).json(err));
});

// GET CART ITEMS FOR A USER
app.get('/cart/:email', (req, res) => {
    Cartmodel.find({ email: req.params.email })
    .then(items => res.json(items))
    .catch(err => res.status(500).json(err));
});

// DELETE CART ITEM
app.delete('/cart/:id', (req, res) => {
    Cartmodel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Deleted" }))
    .catch(err => res.status(500).json(err));
});

// Clear all cart items for a user
app.delete('/cart/clear/:email', (req, res) => {
  const userEmail = req.params.email;

  Cartmodel.deleteMany({ email: userEmail })
    .then(() => res.json({ message: 'Cart cleared' }))
    .catch(err => res.status(500).json({ error: 'Failed to clear cart' }));
});


app.post('/order/confirm', async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch cart items for the user
    const cartItems = await Cartmodel.find({ email });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Copy cart items to orders collection
    const ordersToInsert = cartItems.map(item => ({
      bookname: item.bookname,
      email: item.email,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      orderDate: new Date()
    }));

    await OrderModel.insertMany(ordersToInsert);

    // Optionally, clear cart after confirming order
    // await Cartmodel.deleteMany({ email });

    res.json({ message: 'Order confirmed and saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming order' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if admin
  if (email === "admin@booknet.com" && password === "12345") {
    return res.json({ status: "Success", role: "admin" });
  }

  // Otherwise, check employees collection
  Employeemodel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ status: "Success", role: "user" });
        } else {
          res.json({ status: "Fail", message: "Incorrect password" });
        }
      } else {
        res.json({ status: "Fail", message: "User not found" });
      }
    })
    .catch(err => res.json({ status: "Error", message: err.message }));
});




// ✅ Add a book
app.post("/books", async (req, res) => {
  try {
    const book = await BooksModel.create(req.body);
    res.json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ Get books (with optional category filter)
app.get("/books", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const books = await BooksModel.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ Update book
app.put("/books/:id", async (req, res) => {
  try {
    const updated = await BooksModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ Delete book
app.delete("/books/:id", async (req, res) => {
  try {
    await BooksModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});




mongoose.connect("mongodb://localhost:27017/BookNet");
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
