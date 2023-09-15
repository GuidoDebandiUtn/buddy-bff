import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class RolePermission extends Model {}

RolePermission.init(
  {
    idRolePermission: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "rolePermission",
  }
);
