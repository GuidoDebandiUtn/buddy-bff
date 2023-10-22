import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Trace extends Model {}

Trace.init(
  {
    idTrace: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
    },
    idAuthorUser: {
      type: DataTypes.UUID,
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
    modelName: "trace",
  }
);
