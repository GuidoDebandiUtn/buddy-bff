import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class StateUser extends Model {}

StateUser.init(
  {
    idStateUser: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idUserAuthor: {
      type: DataTypes.UUID,
      allowNull: true,
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
    modelName: "stateUser",
  }
);
