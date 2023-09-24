import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Notification extends Model {}

Notification.init(
  {
    idNotification: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
    },
    processDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "notification",
  }
);
