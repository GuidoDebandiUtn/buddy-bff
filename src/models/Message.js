import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Message extends Model {}

Message.init(
  {
    idMessage: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idUserEmitter: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: "message",
  }
);
