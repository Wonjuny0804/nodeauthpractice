const router = require('express').Router();
const User = require('../models/User');
const { registerValidation }= require('../validation');

// Validation 




router.post('/register', async (req, res) => {
  // Validation 
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  // Checking if the user is already in the database
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists');

  // Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email, 
    password: req.body.password
  });
  
  console.log(user);
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch(err) {
    res.status(400).send(err);
  }
});




module.exports = router;
