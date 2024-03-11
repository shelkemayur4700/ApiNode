const express = require("express");
const app = express();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const fileuploadRoute = require("./routes/fileUploadRoute");
const { errorMiddleware } = require("./middlewares/middleware");
app.use(express.json());
app.use(express.static("uploades"));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/uploads", fileuploadRoute);

//error should be always last priority so put it in last
app.use(errorMiddleware);
module.exports = app;
