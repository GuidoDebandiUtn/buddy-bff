import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class Service extends Model {}

Service.init(
  {
    idService: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    serviceTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openTime: {
      type: DataTypes.TIME,
    },
    closeTime: {
      type: DataTypes.TIME,
    },
    avgRating: {
      type: DataTypes.DECIMAL,
    },
    address: {
      type: DataTypes.STRING,
    },
    open24hs: {
      type: DataTypes.BOOLEAN,
    },
    numberQueries: {
      type: DataTypes.INTEGER,
    },
    emailService: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        // This getter will parse the JSON data stored in the database into a JavaScript array
        const value = this.getDataValue("images");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        // This setter will convert the JavaScript array to a JSON string before storing it in the database
        this.setDataValue("images", value ? JSON.stringify(value) : "[]");
      },
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
    modelName: "service",
  }
);
