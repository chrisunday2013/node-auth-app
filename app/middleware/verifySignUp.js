const db = require("../models");
const Activity = db.Activity;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username

  })
  .exec((err, user) => {
    if(err) {
      res.status(500).send({message: err});
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
  }

  User.findOne({
    email: req.body.email
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({message: err})
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email already in use"});
      return;
    }

    next();
  });
  });
};

checkActivityExisted = (req, res, next) => {
  if (req.body.activities) {
    for (let i = 0; i< req.body.activities.length; i++) {
      if (!Activity.includes(req.body.activities[i])) {
        res.status(400).send({
          message: `Failed! Activity ${req.body.activities[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkActivityExisted
};

module.exports = verifySignUp;