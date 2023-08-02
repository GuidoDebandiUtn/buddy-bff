import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Information extends Model {}

Information.init(
  {
    idInformation: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    titleInformation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionInformation: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    archive: {
      type: DataTypes.BOOLEAN,
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
    modelName: "information",
  }
);
