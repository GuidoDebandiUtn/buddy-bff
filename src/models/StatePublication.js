import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class StatePublication extends Model {}

StatePublication.init(
  {
    idStatePublication: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idUserAuthor: {
      type: DataTypes.UUID,
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
    modelName: "statePublication",
  }
);
