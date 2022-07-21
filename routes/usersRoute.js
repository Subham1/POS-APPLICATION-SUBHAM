// const express = require("express");
// const UserModel = require("../models/userModel");

// // The express. Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.
// const router = express.Router();

// router.post("/login", async (req, res) => {
//   try {
//     await UserModel.findOne({
//       userId: req.body.userid,
//       password: req.body.password,
//       verified: true,
//     });
//     res.send("Login Successfull")
//   } catch (error) {
//     res.status(400).json(err);
//   }
// });
// router.post("/register", async (req, res) => {
//   try {
//     const newuser = new UserModel.find();
//     await newuser.save();
//     res.send("User Registered Successfully");
//   } catch (error) {
//     res.status(400).json(err);
//   }
// });

// module.exports = router;

const express = require("express");
const UserModel = require('../models/userModel')
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });
    if (user) {
      res.send(user);
    } else {
      res.status(400).json({ message: "Login failed" , user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newuser = new UserModel({ ...req.body, verified: false });
    await newuser.save();
    res.send("User Registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;