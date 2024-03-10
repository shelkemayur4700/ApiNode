const express = require("express");
const router = express.Router();
const {
  checkAuthorization,
  encryptPassword,
} = require("../middlewares/middleware");
const {
  getuserData,
  getuserById,
  updateuserById,
} = require("../controllers/usercontroller");
{
  /*----------GET-ALL-USERS-ROUTES-------------- */
}

{
  /* This is a routes level middleware and all the routes defined in this file
 will be protected by this middleware */
}
router.use(checkAuthorization);
{
  /*And if you are using middleware here on specific route level then it specific for that route only */
}
router.get("/", getuserData);
// ------------------GET USER BY ID --------------------------
router.get("/:id", getuserById);

// ------------------UPDATE USER BY ID --------------------------
router.put("/:id", encryptPassword, updateuserById);

module.exports = router;
