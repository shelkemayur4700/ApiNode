const { getAllUsers, getUserById, UpdateUserById } = require("../db/db");
// --------------GET ALL USERS------------------------
const getuserData = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.json({
        message: "Success",
        data: users,
      });
    })
    .catch((err) => {
      next(err);
    });
};
// --------------------------GET USER BY ID ---------------------------
const getuserById = (req, res) => {
  let id = req.params.id;
  let user = getUserById(id);
  // console.log("uder", user);
  res.json({
    message: "Success",
    user, //it wont work like this data : user why
  });
};
// --------------------------UPDATE USER BY ID ---------------------------
const updateuserById = (req, res) => {
  const data = UpdateUserById(req.params.id, req.body);

  res.json({
    message: "Success",
    data,
  });
};
module.exports = {
  getuserData,
  getuserById,
  updateuserById,
};
