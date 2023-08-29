import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Permission extends Model {}

Permission.init(
  {
    idPermission: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    permissionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissionDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenClaim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
    updatedDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "permission",
  }
);
