require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../utils/logger");

const DbConnection = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://subarnaghosh371_db_user:Dk6eDD3Y4J87D4Rw@cluster0.7htjjzq.mongodb.net/crud_application",
    );
    if (conn) {
      logger.info("Database connected");
    } else {
      logger.error("Database not connected");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = DbConnection;

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("nodejsdecember", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// module.exports = sequelize;
