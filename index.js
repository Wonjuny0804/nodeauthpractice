const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const imageRoute = require('./routes/images');
dotenv.config();
// multer for image



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
app.use(cors());



// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api', imageRoute);



app.listen(3000, () => console.log('Server Up and running'));