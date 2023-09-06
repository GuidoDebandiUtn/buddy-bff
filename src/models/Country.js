import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Country extends Model {}

Country.init(
  {
    idCountry: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    countryName: {
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
    modelName: "country",
  }
);
