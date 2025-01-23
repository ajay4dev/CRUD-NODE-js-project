const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const requireToken = require("./Middlewares/AuthTokenRequired");
const cors = require("cors");
require("./db");
require("dotenv").config;

const PORT = 6060;

app.use(bodyParser.json());
var corsOptions = {
  origin: "*", // Allow only this origin
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/", requireToken, (req, res) => {
  res.json({
    message: "Api is working",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
