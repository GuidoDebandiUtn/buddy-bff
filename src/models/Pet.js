import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Pet extends Model {}

Pet.init(
  {
    idPet: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    petName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
    active: {
      type: DataTypes.BOOLEAN,
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
    modelName: "pet",
  }
);
