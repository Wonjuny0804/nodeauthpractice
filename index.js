const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Connect to DB
mongoose.connect(
  'mongodb+srv://admin:uKUXpq6pJr0Fukrj@cluster0.zpx86.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { 
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => console.log('connected to mongoDB'));

// Import Routes
const authRoute = require('./routes/auth');


// Route Middlewares
app.use('/api/user', authRoute);


app.listen(3000, () => console.log('Server Up and running'));