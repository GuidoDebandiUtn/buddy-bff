import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Service extends Model {}

Service.init(
  {
    idService: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    serviceTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openTime: {
      type: DataTypes.TIME,
    },
    closeTime: {
      type: DataTypes.TIME,
    },
    avgRating: {
      type: DataTypes.DECIMAL,
    },
    address: {
      type: DataTypes.STRING,
    },
    open24hs: {
      type: DataTypes.BOOLEAN,
    },
    numberQueries: {
      type: DataTypes.INTEGER,
    },
    emailService: {
      type: DataTypes.STRING,
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
    modelName: "service",
  }
);
