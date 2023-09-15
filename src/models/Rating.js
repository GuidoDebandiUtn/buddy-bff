import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Rating extends Model {}

Rating.init(
  {
    idRating: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    titleRating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionRating: {
      type: DataTypes.STRING,
    },
    numberRating: {
      type: DataTypes.INTEGER,
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
    modelName: "rating",
  }
);
