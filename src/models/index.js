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

User.hasMany(StateUser, { foreignKey: User.idUser });

UserState.hasMany(StateUser, { foreignKey: UserState.idUserState });

StateUser.belongsTo(User, { foreignKey: User.idUser });
StateUser.belongsTo(UserState, { foreignKey: UserState.idUserState });

Locality.belongsTo(Region, { foreignKey: Region.idRegion });

Region.hasMany(Locality, { foreignKey: Region.idRegion });
Region.belongsTo(Province, { foreignKey: Province.idProvince });

Province.hasMany(Region, { foreignKey: Province.idProvince });
Province.belongsTo(Country, { foreignKey: Country.idCountry });

Country.hasMany(Province, { foreignKey: Country.idCountry });

PetType.hasMany(PetBreed, { foreignKey: PetType.idPetType });

PetBreed.belongsTo(PetType, { foreignKey: PetType.idPetType });
