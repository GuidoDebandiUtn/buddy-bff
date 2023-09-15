import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Role extends Model {}

Role.init(
  {
    idRole: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminRole: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "role",
  }
);
