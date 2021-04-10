require('dotenv').config();
const fs = require('fs');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY } = process.env;

const s3 = new S3Client({ 
  region: AWS_BUCKET_REGION,
  S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY
});

// upload a file to s3
const uploadFile = async file => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  }

  try {
    const result = await s3.send(new PutObjectCommand(uploadParams));
    console.log('Successfully uploaded object:' + uploadParams.Bucket + '/' + uploadParams.Key);
    result.Key = file.filename;
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};


// download
const downloadFile = async fileKey => {
  const downloadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileKey
  }

  try {
    const data = await s3.send(new GetObjectCommand(downloadParams));
    console.log('Success, bucket returned');
    return data;
  } catch (err) {
    console.log("Error", err);
  }
}

module.exports.uploadFile = uploadFile;
module.exports.downloadFile = downloadFile;