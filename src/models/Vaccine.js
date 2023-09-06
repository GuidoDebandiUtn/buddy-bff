import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Vaccine extends Model {}

Vaccine.init(
  {
    idVaccine: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    titleVaccine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionVaccine: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    vaccineDate: {
      type: DataTypes.DATE,
    },
    nextVaccineDate: {
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
    modelName: "vaccine",
  }
);
