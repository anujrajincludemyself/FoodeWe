const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB Connected Successfully");

    // Fetch food_items collection
    const fetched_data = await mongoose.connection.db.collection("food_items");

    const data = await fetched_data.find({}).toArray();
    console.log("Food Items:", data);

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = mongodb;
