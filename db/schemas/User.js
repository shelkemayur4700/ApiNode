const mongoose = require("mongoose");
const { Schema } = mongoose;

// This is representation of how your data in mongodb look like
const userSchema = new Schema({
  userName: String,
  name: {
    unique: true,
    type: String,
  },
  age: Number,
});

//so the modal is actual entity on which we will perform opern
const User = mongoose.model("User", userSchema);

module.exports = { User };
