import { DataTypes, Model, STRING } from "sequelize";
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
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
    job: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
    },
    blockedReason: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    cuitCuil: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "user",
  }
);
