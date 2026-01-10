const mongoose = require("mongoose");
const dotenv = require ("dotenv")

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = mongodb;
