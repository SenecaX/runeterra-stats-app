// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/User");
const isPortReachable = require("is-port-reachable");
const request = require("request");

// Sign-up
router.post("/register-user", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((response) => {
        res.status(201).json({
          message: "User successfully created!",
          result: response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
});

// Sign-in
router.post("/signin", (req, res, next) => {
  let getUser;
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        "longer-secret-is-better",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        msg: getUser,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
});

// Get Users
router.route("/").get((req, res) => {
  userSchema.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

// Get Single User
router.route("/user-profile/:id").get((req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Update User
router.route("/update-user/:id").put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("User successfully updated!");
      }
    }
  );
});

// Delete User
router.route("/delete-user/:id").delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

async () => {
  console.log(await isPortReachable(80, { host: "127.0.0.1" }));
};

router.route("http://127.0.0.1:21337/static-decklist").get((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// router.get('/staticting', function(req, res, next){
//   request({
//     uri: 'http://127.0.0.1:21337/static-decklist'
//   })
// }

router.route("/static").get((req, res, next) => {
  request({
    uri: "https://jsonplaceholder.typicode.com/todos/1",
  }).pipe(res);
});

module.exports = router;
