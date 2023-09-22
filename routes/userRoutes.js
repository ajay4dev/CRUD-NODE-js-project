const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("User routes are working");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, dateOfBirth, password } = req.body;

    const user = new User({ name, email, dateOfBirth, password });
    await user.save();
    res.status(201).send({ user, message: "User Created Successfuuly" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      throw new Error("unable to login , unvalid candiates");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new Error("unable to login");
    }

    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY
    );
    res.send({ user, token, message: "Logged in successfully" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
