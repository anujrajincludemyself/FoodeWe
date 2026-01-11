const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (callback) => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB Connected Successfully");

    const foodCollection = mongoose.connection.db.collection("food_items");
    const categoryCollection = mongoose.connection.db.collection("food_categories");

    const foodData = await foodCollection.find({}).toArray();
    const foodCategory = await categoryCollection.find({}).toArray();

    console.log("Food & Categories Loaded");

    if (callback) {
      callback(null, foodData, foodCategory);
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    if (callback) callback(error, null, null);
  }
};

module.exports = connectDB;
