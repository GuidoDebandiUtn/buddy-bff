import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Image extends Model {}

Image.init(
  {
    idImage: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    idReference: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "image",
  }
);
