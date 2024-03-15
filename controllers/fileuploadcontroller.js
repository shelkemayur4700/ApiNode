const UPLOADS = [];
const { UploadtoCloudinary } = require("../services/Cloudinaryservices");
const { fileuploads3 } = require("../services/s3service");

{
  /* ------------------file upload-----------------*/
}
const fileupload = (req, res, next) => {
  //we have to upload file
  // console.log(req.body); // prints file name

  // console.log(req.files);
  // -----Uploading file to cloudinary-----
  UploadtoCloudinary(req.files.file.path)
    .then((data) => {
      res.json({
        message: "File upload sucess",
        Filelink: data,
      });
    })
    .catch((err) => {
      next(err);
    });
  // pushing files to array to get all files
  UPLOADS.push(
    `http://localhost:9090/${req.files.file.path.split("uploades\\")[1]}`
  );
  // prints info relatd ti files.
  console.log(
    "PATH",
    `http://localhost:9090/${req.files.file.path.split("uploades\\")[1]}`
  );
};
{
  /* ------------------S3 file upload-----------------*/
}
const S3fileUpload = (req, res, next) => {
  console.log(req.file);
  // console.log( req.file.originalname.split("."))
  fileuploads3(req.file).then((data) => {
    res.json({
      message: "Success",
      data,
    });
  });
  // console.log(req.files);
};
{
  /*------------------get uploades log------------------------------ */
}
const getUploadedFiles = (req, res) => {
  //we have to upload file
  res.json({
    message: "files fetched",
    data: UPLOADS,
  });
};

module.exports = {
  fileupload,
  getUploadedFiles,
  S3fileUpload,
};
