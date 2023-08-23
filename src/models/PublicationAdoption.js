import { sequelize } from "../database/database.js";
import { DataTypes, Model } from "sequelize";


export class PublicationAdoption extends Model {}

PublicationAdoption.init(
{
    idPublicationAdoption: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactPhone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      newOwnerName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      newOwnerId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      idPetColor: {
        type: DataTypes.UUID,
        allowNull: true
      },
      idPetBreed: {
        type: DataTypes.UUID,
        allowNull: true
      },
      idLocality: {
        type: DataTypes.UUID,
        allowNull: true
      },
      idPublicationState: {
        type: DataTypes.UUID,
        allowNull: true
      },
      idUser: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: "publicationAdoption",
    }
);