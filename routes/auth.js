const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authcontroller");
const { encryptPassword, checkPassword } = require("../middlewares/middleware");
{
  /*----------SIGNUP-ROUTES-------------- */
}
router.post("/signup", encryptPassword, signup);
{
  /*----------SIGNIN-ROUTES-------------- */
}
router.post("/signIn", checkPassword, login);
module.exports = router;
