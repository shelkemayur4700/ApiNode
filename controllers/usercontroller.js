const {
  getAllUsers,
  getUserById,
  UpdateUserById,
  UpdateUserByIdandName,
  DeleteUserById,
  getPaginatedData,
} = require("../db/db");
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
const updateuserById = (req, res, next) => {
  UpdateUserById(req.params.id, req.body)
    .then((data) => {
      res.json({
        message: "Success",
        data,
      });
    })
    .catch((error) => {
      next(error);
    });
};
// --------------------------UPDATE USER BY ID AND USERNAME ALSO ---------------------------
const updateuserByIdAndUserName = (req, res, next) => {
  UpdateUserByIdandName(req.params.id, req.body)
    .then((data) => {
      res.json({
        message: "Success",
        data,
      });
    })
    .catch((error) => {
      next(error);
    });
};
// ------------------DELETE USER BY ID----------------
const deleteuserById = (req, res, next) => {
  DeleteUserById(req.params.id)
    .then((data) => {
      res.json({
        message: "Success",
        data,
      });
    })
    .catch((error) => {
      next(error);
    });
};
// ------------------PAGINATED DATA OF USER ----------------
const getUserDataPaginated = (req, res, next) => {
  console.log(req.query);

  getPaginatedData(
    req.query.limit,
    req.query.page,
    req.query.sortField,
    req.query.sortOrder,
    req.query.search
  )
    .then((data) => {
      res.json({
        message: "Success pagination",
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  getuserData,
  getuserById,
  updateuserById,
  updateuserByIdAndUserName,
  deleteuserById,
  getUserDataPaginated,
};
