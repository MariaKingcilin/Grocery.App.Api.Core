import { config } from "dotenv";
import app from "./app";
import connectDB from "./config/database";
import { runMigrations } from "./config/migration";
import { syncDatabase } from "./models";

config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  await syncDatabase();
  await runMigrations();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV}`);
  });
};

startServer();
