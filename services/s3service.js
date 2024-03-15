const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const fileuploads3 = (file) => {
  // console.log(file.buffer)
  //writing logic to upload file
  const fileType = file.originalname.split(".")[1];
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}.${fileType}`,
    Body: file.buffer,
  };
  return new Promise((res, rej) => {
    s3.upload(params, (err, result) => {
      if (err) {
        rej(err);
      }

      res(result);
    });
  });
};

module.exports = { fileuploads3 };
