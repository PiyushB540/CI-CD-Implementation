const mongoose = require("mongoose");
const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "---------------- MONGODB CONNECTION SET UP SUCCESSFULLY ------------------",
      conn,
    );
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = ConnectDB;
