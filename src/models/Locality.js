import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Locality extends Model {}

Locality.init(
  {
    idLocality: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    localityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    neighborhoods: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        // This getter will parse the JSON data stored in the database into a JavaScript array
        const value = this.getDataValue("neighborhoods");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        // This setter will convert the JavaScript array to a JSON string before storing it in the database
        this.setDataValue(
          "neighborhoods",
          value ? JSON.stringify(value) : "[]"
        );
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "locality",
  }
);
