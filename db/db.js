//Store all the users in it --->
//DAO (Data acess object layer  ----> which interacts with DB)
const { v4: uuidv4 } = require("uuid");
// const USERS = [];
let USERS = []; //making it let becuse we are updating it in updateUserById call

const { User } = require("./schemas/User");
const Order = require("./schemas/Order");

// ---------------------CREATE USER-----------------
// USING NORMAL ARRAY
const createUser = (userData) => {
  let existing = USERS.find((ele) => ele.username == userData.username);
  if (existing) {
    return false;
  }
  userData.id = uuidv4();
  USERS.push(userData);
  return true;
};
// USING MONGO DB
const _createUser = (userData) => {
  //MONGO QUERY

  // check for the user if it already exists
  return new Promise((res, rej) => {
    User.findOne({ userName: userData.userName })
      .then((data) => {
        // data would be null if the record for the above condition is not existing in the db
        console.log("data", data);
        if (data) {
          rej("UserName Already Exists");
        } else {
          const user = new User(userData);
          // it will save the user
          res(user.save());
        }
      })
      .catch((err) => {
        rej(err);
      });
  });

  //SAVE USER
};
// -------------GET ALL USERS-------------------
const getAllUsers = () => {
  // return USERS;
  return User.find();
};
// -------------GET USER BY USERNAME----------------------
const getUserByUsername = (username) => {
  console.log(User.findOne({ userName: username }));
  return User.findOne({ userName: username });
};

// ------------------GET USER BY ID--------------------------------
const getUserById = (id) => {
  return USERS.find((ele) => ele.id == id);
};
// ------------------UPDATE USER BY ID BY MONGODB--------------------------------
const UpdateUserById = (id, data) => {
  return User.updateOne({ _id: id }, { $set: { ...data } });
};
// ------------------UPDATE USER BY ID AND USERNAME--------------------------------
const UpdateUserByIdandName = (id, data) => {
  //when you are updating user on the basis of two entity in this case name and id you have to pass the name in body old one
  //query is look for combination of id and name both then update the data in DB
  return User.updateOne({ _id: id, name: data.name }, { $set: { ...data } });
};
// ------------------DELETE USER BY ID--------------------------------
const DeleteUserById = (id) => {
  return User.deleteOne({ _id: id });
};
// ------------------ PAGINATION WITH SORTING OF USER DATA--------------------------------
const getPaginatedData = (
  limit = 10,
  page = 0,
  sortField,
  sortOrder,
  search
) => {
  // if your request is not sending limit and page values it takes 10 and 0 theses are default values
  //sortField = On which field you want to sort the data
  //[]:1 = Asc and [sortField]:-1= Desc
  sortOrder = sortOrder == "desc" ? -1 : 0; //crosscheck once fro asc
  const re = new RegExp(search, "gi");
  return User.find({ name: { $regex: re } })
    .skip(limit * page)
    .limit(limit)
    .sort({ [sortField]: sortOrder });
};
// // ------------------ PAGINATION On USER DATA--------------------------------
// const getPaginatedData = (limit, page) => {
//   return User.find().skip(limit * page).limit(limit);
// };

// -------------------------------PLACE ORDER-------------------------------------
const saveOrder = (orderData) => {
  const order = new Order(orderData);
  return order.save();
};

const calculateTotalOrder = (name) => {
  return Order.aggregate([
    { $match: { userName: name } },
    {
      $group: {
        _id: "$userName",
        totalsum: { $sum: "$totalAmount" },
      },
    },
  ]);
};
module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  UpdateUserById,
  _createUser,
  getUserByUsername,
  UpdateUserByIdandName,
  DeleteUserById,
  getPaginatedData,
  saveOrder,
  calculateTotalOrder,
};
