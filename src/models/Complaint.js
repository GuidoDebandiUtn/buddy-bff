import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Complaint extends Model {}

Complaint.init(
  {
    idComplaint: {
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
    complaintDescription: {
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
    modelName: "complaint",
  }
);
