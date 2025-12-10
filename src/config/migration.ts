import { sequelize } from "./database";
import { seedRoles } from "./seed/role.seed";

export const runMigrations = async () => {
  try {
    await seedRoles();

    console.log("Migration completed.");
  } catch (error) {
    console.error("Migration error:", error);
  }
};
