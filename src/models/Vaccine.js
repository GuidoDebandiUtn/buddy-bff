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
      defaultValue: true,
    },
    vaccineDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nextVaccineDate: {
      type: DataTypes.DATE,
    },
    notification: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "vaccine",
  }
);
