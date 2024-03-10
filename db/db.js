//Store all the users in it --->
//DAO (Data acess object layer  ----> which interacts with DB)
const { v4: uuidv4 } = require("uuid");
// const USERS = [];
let USERS = []; //making it let becuse we are updating it in updateUserById call

const createUser = (userData) => {
  let existing = USERS.find((ele) => ele.username == userData.username);
  if (existing) {
    return false;
  }
  userData.id = uuidv4();
  USERS.push(userData);
  return true;
};

const getAllUsers = () => {
  return USERS;
};

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
};
