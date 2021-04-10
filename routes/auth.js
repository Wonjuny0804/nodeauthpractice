const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validation');


router.post('/register', async (req, res) => {
  // Validation 
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  // Checking if the user is already in the database
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  // Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email, 
    password: hashedPassword
  });
  
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch(err) {
    res.status(400).send(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
   // Validation 
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return  res.status(400).send('Not a registered user');

  // passwrod check
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid password');


  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);


  // try {
  //   res.send('Logged IN!');
  // } catch (err) {
  //   res.status(400).send('something went wrong please try again');
  // }
})


module.exports = router;
