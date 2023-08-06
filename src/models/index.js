import { User } from "./User.js";
import { UserState } from "./UserState.js";
import { StateUser } from "./StateUser.js";
import { Country } from "./Country.js";
import { Province } from "./Province.js";
import { Region } from "./Region.js";
import { Locality } from "./Locality.js";
import { PetBreed } from "./PetBreed.js";
// import { PetColor } from "./PetColor.js";
import { PetType } from "./PetType.js";
import { ServiceType } from "./ServiceType.js";
// import { Document } from "./Document.js";
// import { Image } from "./Image.js";
// import { Pet } from "./Pet.js";
// import { Vaccine } from "./Vaccine.js";
// import { Information } from "./Information.js";
// import { Turn } from "./Turn.js";
import { Rating } from "./Rating.js";
import { Service } from "./Service.js";
import { StateService } from "./StateService.js";
import { ServiceState } from "./ServiceState.js";
import { UserType } from "./UserType.js";

User.hasMany(StateUser, { foreignKey: "idUser" });
User.belongsTo(UserType, { foreignKey: "idUserType" });
User.hasMany(Rating, { foreignKey: "idUser" });

UserState.hasMany(StateUser, { foreignKey: "idUserState" });

StateUser.belongsTo(User, { foreignKey: "idUser" });
StateUser.belongsTo(UserState, { foreignKey: "idUserState" });

UserType.hasMany(User, { foreignKey: "idUserType" });

Locality.belongsTo(Region, { foreignKey: "idRegion" });

Region.hasMany(Locality, { foreignKey: "idRegion" });
Region.belongsTo(Province, { foreignKey: "idProvince" });

Province.hasMany(Region, { foreignKey: "idProvince" });
Province.belongsTo(Country, { foreignKey: "idCountry" });

Country.hasMany(Province, { foreignKey: "idCountry" });

PetType.hasMany(PetBreed, { foreignKey: "idPetType" });

PetBreed.belongsTo(PetType, { foreignKey: "idPetType" });

Service.hasMany(StateService, { foreignKey: "idUser" });
Service.belongsTo(ServiceType, { foreignKey: "idServiceType" });
Service.hasMany(Rating, { foreignKey: "idService" });

ServiceState.hasMany(StateService, { foreignKey: "idUserState" });

StateService.belongsTo(Service, { foreignKey: "idUser" });
StateService.belongsTo(ServiceState, { foreignKey: "idUserState" });

ServiceType.hasMany(Service, { foreignKey: "idServiceType" });

Rating.belongsTo(User, { foreignKey: "idUser" });
Rating.belongsTo(Service, { foreignKey: "idService" });
