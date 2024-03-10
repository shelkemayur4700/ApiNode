const { createUser } = require("../db/db");
var jwt = require("jsonwebtoken");
const signup = (req, res, next) => {
  const user = req.body;
  let result = createUser(user);
  if (result) {
    res.json({
      status: "Success",
      message: "User Created",
    });
  } else {
    //throw will stops the all process and showing stack strace(error in console)
    //any may excit the server
    // throw new Error("Eroooooooooooooor");

    //if you invoken  next like this anywhere in code
    //it will just hit error middleware
    next(new Error("User Already Exists!"));
  }
};
// ------------------login------------
const login = (req, res) => {
  //issue the jwt token
  const token = jwt.sign({ username: req.body.username }, process.env.JWTKEY);

  res.json({
    status: "Success",
    token: token,
    message: "User Logged in",
  });
};

module.exports = { signup, login };
