import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class ServiceState extends Model {}

ServiceState.init(
  {
    idServiceState: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    serviceStateName: {
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
    modelName: "serviceState",
  }
);
