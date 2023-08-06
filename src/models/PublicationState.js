import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database.js";

export class PublicationState extends Model {}

PublicationState.init({
    idPublicationState:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    code:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    expirationDate:{
        type: DataTypes.DATE
    }
},
{
  sequelize,
  timestamps: false,
  modelName: "PUBLICATION_STATE",
});