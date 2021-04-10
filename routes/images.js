const router = require('express').Router();
const multer = require('multer');
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
  const data = await downloadFile(key);
  console.log('######################+++++++++++++++++++++++#########################################');
  const src = `data:image/jpeg;base64,${encode(data.Body)}`;
  res.send(src);
  // console.log(data.client);
  // try {
  //   console.log('===========================data=========================: ');
  //   const readStream = createReadStream(data);
  //   console.log(readStream);
  // } catch (err) {
  //   console.log(err);
  // }

  // res.send(data.path);
})

module.exports = router;