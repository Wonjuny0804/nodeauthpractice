const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/', verify, (req, res) => {
  res.json({ posts: {titles: 'my first post', description: 'random data bla bla' }})
})

module.exports = router;