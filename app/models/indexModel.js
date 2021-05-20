const mongoose = require("mongoose");
mongoose.connect("mongodb + srv://chrisunday2013:<Chrisunday124>@cluster0-a9gdr.mongodb.net/test?retryWrites=true&w=majority")
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./useModel");
db.activities = require("./ActivityModel");

db.Activity = ["user", "admin", "tutor", "student"];

module.exports = db;
