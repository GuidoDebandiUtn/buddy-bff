import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class ServicePet extends Model {}

ServicePet.init(
  {
    idServicePet: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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
    modelName: "servicePet",
  }
);
