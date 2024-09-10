import { Sequelize } from "sequelize";
require("dotenv").config();

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize(
  process.env.DB_DATABASENAME,
  process.env.DB_USERNAME,
  null,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
