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
const path = require("path");
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

//TO DOWNLOAD FILE AND AUTHENTICATE USER
router.get("/fileRedirect/:fileName", (req, res) => {
  console.log("calling router......");
  const fileName = req.params.fileName;
  //IF YOU WANT TO SEND SOME HTML
  //  HERE WE ARE SENDING HTML AND CALLING SECOND API ON THAT BUTTON CLICK.
  // res.send(`
  //     <html>
  //     <form method="post" action="/uploads/fileDownload/${fileName}"  >
  //     <input name="password" type="text"/>
  //     <button type="submit">Download File</button>
  //     </form>
  //   </html>
  //   `);
  res.redirect(`/uploads/fileDownload/${fileName}`);
});

router.get("/uploads/fileDownload/:fileName", (req, res) => {
  console.log(req.body);

  // if (req.body.password == "hello") {
  const fileName = req.params.fileName;
  console.log(`${path.join(__dirname, "../uploads", fileName)}`);
  res.sendFile(`${path.join(__dirname, "../uploads", fileName)}`);
  //   return;
  // }

  // res.send("Unauthorized");

  return;
});

module.exports = router;
