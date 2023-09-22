import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class UserState extends Model {}

UserState.init(
  {
    idUserState: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userStateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "userState",
  }
);
