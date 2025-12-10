import { Role } from "./roles.model";
import { User } from "./users.model";

export const syncDatabase = async (): Promise<void> => {
  try {
    await Role.sync({ alter: true });
    await User.sync({ alter: true });
    console.log("Database model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error;
  }
};
