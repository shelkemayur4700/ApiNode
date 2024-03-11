const express = require("express");
const router = express.Router();
const { fileupload } = require("../controllers/fileuploadcontroller");
const multipart = require("connect-multiparty");
const path = require("path");
const multipartMiddleware = multipart({
  uploadDir: `${path.join(__dirname, "../uploades")}`,
});
// console.log("????", `${path.join(__dirname, "../uploades")}`);
{
  /*----------SIGNUP-ROUTES-------------- */
}
router.post("/", multipartMiddleware, fileupload);
module.exports = router;
