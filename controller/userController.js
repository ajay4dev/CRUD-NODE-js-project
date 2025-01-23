const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req , res) => {
    try {
        // Destructure the fields from the request body
        const { firstName, lastName, userName, email, password, passwordconfirm } = req.body;
    
        // Check if password and passwordconfirm match
        if (password !== passwordconfirm) {
          return res.status(400).send({ error: "Passwords do not match." });
        }
    
        // Create a new user instance
        const user = new User({
          firstName,
          lastName,
          userName,
          email,
          password,
        });
    
        // Save the user to the database
        await user.save();
    
        // Send a success response
        res.status(201).send({ user, message: "User Created Successfully" });
      } catch (err) {
        // Handle errors and send a failure response
        res.status(400).send({ error: err.message });
      }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Find user by name
        const user = await User.findOne({ email });
    
        if (!user) {
          throw new Error("Invalid credentials, unable to login");
        }
    
        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);
    
        if (!isMatch) {
          throw new Error("Invalid credentials, unable to login");
        }
    
        // Create JWT payload
        const payload = {
          userId: user.id,
          email: user.email,
        };
    
        // Sign the token
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
    
        // Send the response with the token, userId, and decrypted data
        res.status(200).json({
          token,
          // userId: user.id,
          message: "Logged in successfully",
        });
      } catch (err) {
        console.error("Error:", err.message);
        res.status(400).json({ error: err.message });
      }
}