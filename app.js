const express = require("express");
const app = express();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const { errorMiddleware } = require("./middlewares/middleware");
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);

//error should be always last priority so put it in last
app.use(errorMiddleware);
module.exports = app;
