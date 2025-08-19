const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected !!!");
  } catch (error) {
    console.log("Error with MongoDB",error);
    process.exit(1);
  }
};

module.exports = connection;
