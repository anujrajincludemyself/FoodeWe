const express = require("express");
const User = require("../models/user");
const Order = require("../models/Orders");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const fetch = require("../middleware/fetchdetails");

const jwtSecret = process.env.JWT_SECRET || "GoFoodSecret";

// -------------------- SIGNUP --------------------
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
        location: req.body.location,
      });

      const data = {
        user: { id: user.id },
      };

      const authToken = jwt.sign(data, jwtSecret);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      if (error.code === 11000) {
        return res.json({ success: false, error: "Email already exists" });
      }
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// -------------------- LOGIN --------------------
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password);
      if (!pwdCompare) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const data = {
        user: { id: user.id },
      };

      const authToken = jwt.sign(data, jwtSecret);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// -------------------- GET USER --------------------
router.post("/getuser", fetch, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// -------------------- GET LOCATION --------------------
router.post("/getlocation", async (req, res) => {
  try {
    const { lat, long } = req.body.latlong;

    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.OPENCAGE_KEY}`
    );

    const comp = response.data.results[0].components;
    const { village, county, state_district, state, postcode } = comp;

    const location = `${village}, ${county}, ${state_district}, ${state} - ${postcode}`;
    res.send({ location });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// -------------------- FOOD DATA --------------------
router.post("/foodData", async (req, res) => {
  try {
    res.send([global.foodData, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// -------------------- ORDER DATA --------------------
router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date });

    let user = await Order.findOne({ email: req.body.email });

    if (!user) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// -------------------- MY ORDERS --------------------
router.post("/myOrderData", async (req, res) => {
  try {
    const order = await Order.findOne({ email: req.body.email });
    res.json({ orderData: order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
