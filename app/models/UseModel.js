const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    activities: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Activity"
      }
    ]

  })
);

module.exports = User