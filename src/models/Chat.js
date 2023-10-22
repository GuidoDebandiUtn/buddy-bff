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
    idUserReceptor: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    archivedEmitter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    archivedReceptor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    language: {
      type: DataTypes.STRING,
      defaultValue:"español",
    },
    idReference: {
      type: DataTypes.UUID,
    },    
    referenceType: {
      type: DataTypes.STRING,
    },    
    lastMessageDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "chat",
  }
);
