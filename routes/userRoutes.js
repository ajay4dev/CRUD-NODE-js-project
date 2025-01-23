const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controller/userController");

router.get("/", (req, res) => {
  res.send("User routes are working");
});

router.post("/register", userRegister);

router.post("/login", userLogin);

module.exports = router;
