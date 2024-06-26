const express = require("express");
const app = express();
const orderRouter = require("./routes/order");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const fileuploadRoute = require("./routes/fileUploadRoute");
const { errorMiddleware } = require("./middlewares/middleware");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("uploades"));
app.use(express.urlencoded({ extended: true })); //redirect file
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/uploads", fileuploadRoute);
// ------------ORDER ROUTES----------- 
app.use("/order", orderRouter);
//error should be always last priority so put it in last
app.use(errorMiddleware);
module.exports = app;
