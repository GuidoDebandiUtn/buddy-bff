import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class User extends Model {}

User.init(
  {
    idUser: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    mail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
    },
    cuit: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.INTEGER,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: "users",
  }
);
