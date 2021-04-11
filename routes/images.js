const router = require('express').Router();
const multer = require('multer');
const fetch = require('node-fetch');
const { readStream, createReadStream } = require('fs');
const upload = multer({ dest: 'uploads/' });
const { uploadFile, downloadFile } = require('../utils/s3');
const { encode } = require('../utils/encode');

router.post('/images', upload.single('image'), (req, res) => {
  const file = req.file;
  const result = uploadFile(file);
  const description = req.body.description;
  res.send("DONE");
})

router.get('/images/:key', async (req, res) => {
  const key = req.params.key;
  try {
    const data = await downloadFile(key);
    console.log('######################+++++++++++++++++++++++#########################################');
    // const src = `data:image/jpeg;base64,${encode(data.Body)}`;
    const response = await fetch(data);
    const image = await response.blob();
    console.log(image);
    res.send(image);
    console.log('Success!');
  } catch(err) {
    console.log(err);
    res.send(err);
  }
})

module.exports = router;