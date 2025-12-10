import { Role } from "../../models/roles.model";

export async function seedRoles() {
  await Role.bulkCreate(
    [
      { id: 1, name: "seller" },
      { id: 2, name: "buyer" },
    ],
    { ignoreDuplicates: true }
  );

  console.log("Roles seeded successfully");
}
