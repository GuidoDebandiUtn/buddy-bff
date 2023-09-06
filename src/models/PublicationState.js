import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class PublicationState extends Model {}

PublicationState.init(
  {
    idPublicationState: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
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
    modelName: "publicationState",
  }
);
