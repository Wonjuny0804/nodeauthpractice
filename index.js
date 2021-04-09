const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import Routes
const authRoute = require('./routes/auth');
dotenv.config();

// Connect to DB
// process.env.DB_CONNECT
mongoose.connect(
  process.env.DB_CONNECT,
  { 
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  function (err) {
    try {
      console.log('Successfully linked');
    } catch (error) {
      console.log(error);
    }
  }
);




// Middleware
app.use(express.json());



// Route Middlewares
app.use('/api/user', authRoute);


app.listen(3000, () => console.log('Server Up and running'));