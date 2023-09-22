const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const requireToken = require("./Middlewares/AuthTokenRequired")
require("./db");
require("dotenv").config;

const PORT  = 6060;

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/",requireToken, (req, res) => {
    res.json({
        message: "Api is working"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
});