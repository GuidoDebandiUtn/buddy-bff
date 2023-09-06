import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class PetType extends Model {}

PetType.init(
  {
    idPetType: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    petTypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legsNumber: {
      type: DataTypes.SMALLINT,
    },
    diet: {
      type: DataTypes.STRING,
    },
    enviroment: {
      type: DataTypes.STRING,
    },
    coat: {
      type: DataTypes.STRING,
    },
    weather: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: "petType",
  }
);
