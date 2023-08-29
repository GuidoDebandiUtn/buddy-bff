import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Report extends Model {}

Report.init(
  {
    idReport: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idUserReporting: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    idUserReported: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reportDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: "report",
  }
);
