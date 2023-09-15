import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class PetBreed extends Model {}

PetBreed.init(
  {
    idPetBreed: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    petBreedName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
    },
    intelligence: {
      type: DataTypes.STRING,
    },
    temperament: {
      type: DataTypes.STRING,
    },
    lifespan: {
      type: DataTypes.SMALLINT,
    },
    specialProperty: {
      type: DataTypes.STRING,
    },
    fur: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "petBreed",
  }
);
