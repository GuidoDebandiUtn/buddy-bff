import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Turn extends Model {}

Turn.init(
  {
    idTurn: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    titleTurn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionTurn: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    archive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    turnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    alertType: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "turn",
  }
);
