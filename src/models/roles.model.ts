import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { RoleInterface } from "../types/role.type";

export class Role extends Model<RoleInterface> implements RoleInterface {
  public id!: number;
  public name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "Roles",
    modelName: "Role",
    timestamps: false,
  }
);
