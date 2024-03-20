const { createUser, _createUser, getUserByUsername } = require("../db/db");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = (req, res, next) => {
  const user = req.body;
  console.log("user", user);
  let result = _createUser(user)
    .then((result) => {
      res.json({
        status: "Success",
        message: "User Created",
      });
    })
    .catch((err) => {
      //throw will stops the all process and showing stack strace(error in console)
      //any may excit the server
      // throw new Error("Eroooooooooooooor");

      //if you invoken  next like this anywhere in code
      //it will just hit error middleware
      next(new Error("User Already Exists!"));
    });
};
// ------------------login------------
const login = async (req, res, next) => {
  //issue the jwt token
  // console.log("req.body.userName", req.body.userName);
  let user = await getUserByUsername(req.body.userName);
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      //this is not working properly when we pass wrong password
      if (!result) {
        next("Enter correct userName and Password");
      } else {
        const token = jwt.sign(
          { username: req.body.userName },
          process.env.JWTKEY
        );
        res.json({
          status: "Success",
          token: token,
          message: "User Logged In",
        });
      }
    });
  } else {
    next("User Not found");
  }
};

// you have to check for the passwords

// then you have to issue the token

// issuing the jwt

module.exports = { signup, login };
