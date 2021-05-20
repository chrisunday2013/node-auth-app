const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const User = db.user;
const Activity = db.activities;


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if(!token) {
    return res.status (403).send({message: "No token provided!"});
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.status(401).send({message: "Unauthorized!"});
    }
    req.userId = decoded.id; 
    next();
  });
};


isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) =>{
    if(err) {
      res.status(500).send({message: err});
      return;
    }

    Activity.find(
      {
        _id: {$in: user.activities}
      },
      (err, activities) => {
        if (err) {
          res.status(500).send({message: err});
          return;

        }

        for (let i = 0; i< activities.length; i++) {
          if(activities[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({message: "Execute Admin Activity"});

      return;
     }
    );

  });
};

isTutor = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if(err) {
      res.status(500).send({message: err});
      return;
    }

    Activity.find(
      {
        _id: {$in: user.roles} 
      },
      (err, activities) => {
        if (err) {
          res.status(500).send({message: err});
          return;
        }
        
      
        for (let i = 0; i< activities.length; i++) {
          if (activities[1].name === "tutor") {
            next();
            return;
          }
        }

        res.status(403).send({message: "Perform Tutor Activities!"});
        return;
       
      }
    );
  });
};


isStudent = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Activity.find(
      {
        _id: { $in: user.activities }
      },
      (err, activities) => {
        if (err) {
          res.status(500).send({ message: err });
          return;

        }

        for (let i = 0; i < activities.length; i++) {
          if (activities[i].name === "student") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Perform Student Activity" });

        return;
      }
    );

  });
};

const jwtAuthen = {
  verifyToken,
  isAdmin,
  isTutor,
  isStudent
};

module.exports = jwtAuthen;

