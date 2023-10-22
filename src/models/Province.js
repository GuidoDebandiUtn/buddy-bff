import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Province extends Model {}

Province.init(
  {
    idProvince: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    provinceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weather: {
      type: DataTypes.STRING,
    },
    
    population: {
      type: DataTypes.DOUBLE,
    },
    surface: {
      type: DataTypes.DOUBLE,
    },
    populationDensity: {
      type: DataTypes.DOUBLE,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "province",
  }
);
