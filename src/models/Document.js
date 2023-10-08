import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Document extends Model {}

Document.init(
  {
    idDocument: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    file: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    validDate: {
      type: DataTypes.DATE,
    },
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "document",
  }
);
