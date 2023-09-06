import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Region extends Model {}

Region.init(
  {
    idRegion: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    regionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surface: {
      type: DataTypes.DOUBLE,
    },
    population: {
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
    modelName: "region",
  }
);
