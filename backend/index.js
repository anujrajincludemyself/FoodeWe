const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

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

// CORS for Production Frontend
app.use(cors({
  origin: "https://foodiewe.vercel.app",
  credentials: true
}));

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
