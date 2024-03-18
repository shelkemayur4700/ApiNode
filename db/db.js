//Store all the users in it --->
//DAO (Data acess object layer  ----> which interacts with DB)
const { v4: uuidv4 } = require("uuid");
// const USERS = [];
let USERS = []; //making it let becuse we are updating it in updateUserById call

const { User } = require("./schemas/User");

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
// -------------GET USER BY NAME----------------------
const getUserByUsername = (username) => {
  return USERS.find((ele) => ele.username == username);
};
// ------------------GET USER BY ID--------------------------------
const getUserById = (id) => {
  return USERS.find((ele) => ele.id == id);
};
// ------------------UPDATE USER BY ID--------------------------------
const UpdateUserById = (id, data) => {
  let filtered = USERS.filter((ele) => ele.id != id);
  // adding id to newly updated/added data
  data.id = id;
  filtered.push(data);
  USERS = [...filtered];
  return true;
};
module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  getUserById,
  UpdateUserById,
  _createUser,
};
