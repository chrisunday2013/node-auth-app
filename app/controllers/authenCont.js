const config = require ("../config/authConfig");
const db = require("../models");
const User = db.user;
const Activity = db.activities;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)

  })

  user.save((err, user) => {
    if(err) {
      res.status(500).send({message: err});
      return;
    }

    if (req.body.activities) {
      Activity.find(
        {
          name: { $in: req.body.activities}
        },
        (err, activities) => {
          if (err) {
            res.status(500).send({message: err});
            return;
          }

          user.activities = activities.map(activities => activities_id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err});
              return;
            }

            res.send({message: "User was registered successfully!"});
          });
        }
      );

    } else {
      Activity.findOne({name: "user"}, (err, activities) =>{
        if(err) {
          res.status(500).send({message: err});
          return;
        }

        user.activities = [activities._id];
        user.save(err => {
          if(err) {
            res.status(500).send({message: err});
            return;
          }

          res.send({message: "User was registered successfully!" });
        });
      });
    }
  });
};


exports.signin = (req, res)
    User.findOne({
      username: req.body.username
    })

    .populate("activities", "-_v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }

      if(!user) {
        return res.status(404).send({message: "User Not found."});
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if(!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 1000
      });

      var authorities = [];

      for (let i = 0; i < user.activities.length; i++) {
        authorities.push("Activity_" + user.activities[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });






