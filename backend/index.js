const express = require("express");
const app = express();
const mongodb = require("./db");
const dotenv = require ("dotenv").config();

mongodb();   // connect to MongoDB

// Middleware to read JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GoFood backend is running");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
