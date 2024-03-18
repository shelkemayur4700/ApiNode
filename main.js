const app = require("./app");
require("dotenv").config(); //It transfers variables to your os

const port = process.env.PORT; //from your OS env
const connect = require("./db/mongodb");
// DB URL
const URL =
  "mongodb+srv://Mayur:947Xy9l3rgYLpXQI@cluster0.k9dfawg.mongodb.net/march?retryWrites=true&w=majority&appName=Cluster0";
// CONNECTING TO DB
connect(URL)
  .then((data) => {
    app.listen(port, () => {
      console.log(`Database connected ,Server running on port `, port);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database.");
  });
