const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

// ------------------ MongoDB + Food Data ------------------
require("./db")((err, data, CatData) => {
  if (err) {
    console.log("Food DB error:", err);
  } else {
    global.foodData = data;
    global.foodCategory = CatData;
    console.log("Food data loaded");
  }
});

// ------------------ Middleware ------------------
app.use(express.json());

// CORS for React
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// ------------------ Test Route ------------------
app.get("/", (req, res) => {
  res.send("GoFood Backend is Running");
});

// ------------------ Routes ------------------
app.use("/api", require("./routes/CreateUser"));   // signup
app.use("/api/auth", require("./routes/Auth"));   // login, orders, food
app.use("/api/food", require("./routes/FoodData"));// food menu

// ------------------ Start Server ------------------
app.listen(PORT, () => {
  console.log(`GoFood Server running on http://localhost:${PORT}`);
});
