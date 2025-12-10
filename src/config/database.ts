import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();
export const sequelize = new Sequelize(
  process.env.DB_NAME || "Grocery_App",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "1234",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

export default connectDB;
