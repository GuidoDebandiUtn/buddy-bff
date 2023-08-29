import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Chat extends Model {}

Chat.init(
  {
    idChat: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    archive: {
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
    modelName: "chat",
  }
);
