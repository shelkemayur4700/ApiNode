const express = require("express");
const router = express.Router();
const {
  fileupload,
  getUploadedFiles,
  s3fileupload,
  S3fileUpload,
} = require("../controllers/fileuploadcontroller");
const { multipartMiddleware } = require("../middlewares/middleware");
const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("file");

// console.log("upload", upload);
// ---------------cloudinsary file uploading route --------------------
router.post("/", multipartMiddleware, fileupload);
// ---------------s3 file uploading route --------------------
router.post("/S3", upload, S3fileUpload);

// -----------get all uploaded files -------------
router.get("/files", getUploadedFiles);

module.exports = router;
