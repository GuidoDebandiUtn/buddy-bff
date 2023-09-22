import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class UserRole extends Model {}

UserRole.init(
  {
    idUserRole: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idUserAuthor: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "userRole",
  }
);
