import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class PublicationSearch extends Model {}

PublicationSearch.init(
{
    idPublicationSearch: {
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
        allowNull: true,
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
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      isFound: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      lostDate:{
        type: DataTypes.DATE,
        allowNull: false,
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
        allowNull: true
        //TODO cambiar valor de allowNull cuando se integre el token
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: "publicationSearch",
    }
);

