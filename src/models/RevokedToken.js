import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class RevokedToken extends Model {}

RevokedToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "revokedToken",
  }
);
