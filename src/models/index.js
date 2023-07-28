import { User } from "./User.js";
import { UserState } from "./UserState.js";
import { StateUser } from "./StateUser.js";
import { Country } from "./Country.js";
import { Province } from "./Province.js";
import { Region } from "./Region.js";
import { Locality } from "./Locality.js";
import { PetBreed } from "./PetBreed.js";
import { PetColor } from "./PetColor.js";
import { PetType } from "./PetType.js";
import { ServiceType } from "./ServiceType.js";

User.hasMany(StateUser, { foreignKey: "idUser" });

UserState.hasMany(StateUser, { foreignKey: "idUserState" });

StateUser.belongsTo(User, { foreignKey: "idUser" });
StateUser.belongsTo(UserState, { foreignKey: "idUserState" });

Locality.belongsTo(Region, { foreignKey: "idRegion" });

Region.hasMany(Locality, { foreignKey: "idRegion" });
Region.belongsTo(Province, { foreignKey: "idProvince" });

Province.hasMany(Region, { foreignKey: "idProvince" });
Province.belongsTo(Country, { foreignKey: "idCountry" });

Country.hasMany(Province, { foreignKey: "idCountry" });

PetType.hasMany(PetBreed, { foreignKey: "idPetType" });

PetBreed.belongsTo(PetType, { foreignKey: "idPetType" });
