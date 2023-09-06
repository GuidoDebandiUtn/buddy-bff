import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class ServiceType extends Model {}

ServiceType.init(
  {
    idServiceType: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    serviceTypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    enablingInfo: {
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
    modelName: "serviceType",
  }
);
