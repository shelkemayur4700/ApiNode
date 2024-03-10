const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../db/db");
//its a very special middleware, it takes four arguments
// then express automatically knows it is error middleware
//4 arguments only you hve to pass to middleware
const errorMiddleware = (err, req, res, next) => {
  //we will send error from here
  res.json({
    message: "Failed",
    error: err.toString(),
  });
};

//this will be route level middleware
const encryptPassword = (req, res, next) => {
  //more no of rounds you have more secure password is and more time it takes.
  //so use it minimum. like 10
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    console.log(hash);
    req.body.password = hash;
    next();
  });
};
// -----------SIGN IN------------
const checkPassword = async (req, res, next) => {
  const user = await getUserByUsername(req.body.username);
  console.log("User : ", user);
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      //this is not working properly when we pass wrong password

      if (!result) {
        next(new Error("Please enter correct username and password  "));
      } else {
        next();
      }
    });
  } else {
    next(new Error());
  }
};

{
  /* ----------------------------AUTHORIZATION---------------------------*/
}
{
  /*ROUTES LEVEL MIDDLEWARE */
  /*WE ARE CHECKING THAT USER IS AUTHORISED OR NOT ON ROUTES LEVEL */
}

const checkAuthorization = (req, res, next) => {
  //WE WILL BE CHECKING JWT HEADER
  const authorizationToken = req.headers.authorization;
  if (authorizationToken) {
    // We will check the token here ,that if it is the valid token ornot

    try {
      jwt.verify(authorizationToken, process.env.JWTKEY);

      next();
    } catch (err) {
      res.status(401).json({
        status: "Failed",
        message: "Token Malformed...",
      });
    }
  } else {
    res.status(401).json({
      status: "Failed",
      message: "Authorization Required",
    });
  }
};
module.exports = {
  errorMiddleware,
  encryptPassword,
  checkPassword,
  checkAuthorization,
};
