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
    },
    turnDate: {
      type: DataTypes.DATE,
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
    modelName: "turn",
  }
);
