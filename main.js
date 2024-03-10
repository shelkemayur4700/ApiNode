const app = require("./app");
require("dotenv").config(); //It transfers variables to your os

const port = process.env.PORT; //from your OS env

app.listen(port, () => {
  console.log(`Server running on port `, port);
});
