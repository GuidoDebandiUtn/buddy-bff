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
      defaultValue: "español",
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
    readed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "notification",
  }
);
