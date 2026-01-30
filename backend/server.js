const cors = require("cors");
const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");

require("dotenv").config();
require("./db");

const authRoutes = require("./routes/auth");
app.use(cors());


app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/tasks", taskRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
