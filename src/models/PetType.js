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
    legNumber: {
      type: DataTypes.SMALLINT,
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
