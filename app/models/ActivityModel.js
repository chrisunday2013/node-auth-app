const mongoose = require("mongoose");

const Activity = mongoose.model(
  "Activity",
   new mongoose.Schema({
  name: String
})

);


module.exports = Activity;