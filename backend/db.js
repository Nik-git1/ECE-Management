// Password - ZhAvFaZZ4JJrejmN
// 

const mongoose = require('mongoose');
const mongooseURL = "mongodb+srv://arnav20363:ZhAvFaZZ4JJrejmN@cluster0.bmrdkp0.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongooseURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Successfully connected to Mongo");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToMongo;