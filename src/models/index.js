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
import { PublicationState } from "./PublicationState.js";

// import { Document } from "./Document.js";
// import { Image } from "./Image.js";
import { Pet } from "./Pet.js";
import { Vaccine } from "./Vaccine.js";
import { Information } from "./Information.js";
import { Turn } from "./Turn.js";
import { Rating } from "./Rating.js";
import { Trace } from "./Trace.js";
import { Service } from "./Service.js";
import { StateService } from "./StateService.js";
import { ServiceState } from "./ServiceState.js";
import { UserType } from "./UserType.js";
import { PublicationAdoption } from "./PublicationAdoption.js";
import { PublicationSearch } from "./PublicationSearch.js";

User.hasMany(StateUser, { foreignKey: "idUser" });
User.belongsTo(UserType, { foreignKey: "idUserType" });
User.hasMany(Rating, { foreignKey: "idUser" });
User.hasMany(Pet, { foreignKey: "idUser" });
User.belongsTo(Locality, { foreignKey: "idLocality" });

UserState.hasMany(StateUser, { foreignKey: "idUserState" });

StateUser.belongsTo(User, { foreignKey: "idUser" });
StateUser.belongsTo(UserState, { foreignKey: "idUserState" });

UserType.hasMany(User, { foreignKey: "idUserType" });

Locality.belongsTo(Region, { foreignKey: "idRegion" });
Locality.hasMany(User, { foreignKey: "idLocality" });

Region.hasMany(Locality, { foreignKey: "idRegion" });
Region.belongsTo(Province, { foreignKey: "idProvince" });

Province.hasMany(Region, { foreignKey: "idProvince" });
Province.belongsTo(Country, { foreignKey: "idCountry" });

Country.hasMany(Province, { foreignKey: "idCountry" });

PetType.hasMany(PetBreed, { foreignKey: "idPetType" });

PetBreed.belongsTo(PetType, { foreignKey: "idPetType", as: "type" });

Service.hasMany(StateService, { foreignKey: "idUser" });
Service.belongsTo(ServiceType, { foreignKey: "idServiceType" });
Service.hasMany(Rating, { foreignKey: "idService" });

ServiceState.hasMany(StateService, { foreignKey: "idUserState" });

StateService.belongsTo(Service, { foreignKey: "idUser" });
StateService.belongsTo(ServiceState, { foreignKey: "idUserState" });

ServiceType.hasMany(Service, { foreignKey: "idServiceType" });

Rating.belongsTo(User, { foreignKey: "idUser" });
Rating.belongsTo(Service, { foreignKey: "idService" });

PublicationAdoption.belongsTo(PetColor, {
  foreignKey: "idPetColor",
  as: "color",
});
PetColor.hasMany(PublicationAdoption, { foreignKey: "idPetColor" });

PublicationAdoption.belongsTo(PetBreed, {
  foreignKey: "idPetBreed",
  as: "breed",
});
PetBreed.hasMany(PublicationAdoption, { foreignKey: "idPetBreed" });

PublicationAdoption.belongsTo(Locality, {
  foreignKey: "idLocality",
  as: "locality",
});
Locality.hasMany(PublicationAdoption, { foreignKey: "idLocality" });

PublicationAdoption.belongsTo(PublicationState, {
  foreignKey: "idPublicationState",
  as: "state",
});
PublicationState.hasMany(PublicationAdoption, {
  foreignKey: "idPublicationState",
});

PublicationAdoption.belongsTo(User, { foreignKey: "idUser", as: "usuario" });
User.hasMany(PublicationAdoption, { foreignKey: "idUser" });

PublicationSearch.belongsTo(PetColor, {
  foreignKey: "idPetColor",
  as: "color",
});
PetColor.hasMany(PublicationSearch, { foreignKey: "idPetColor" });

PublicationSearch.belongsTo(PetBreed, {
  foreignKey: "idPetBreed",
  as: "breed",
});
PetBreed.hasMany(PublicationSearch, { foreignKey: "idPetBreed" });

PublicationSearch.belongsTo(Locality, {
  foreignKey: "idLocality",
  as: "locality",
});
Locality.hasMany(PublicationSearch, { foreignKey: "idLocality" });

PublicationSearch.belongsTo(PublicationState, {
  foreignKey: "idPublicationState",
  as: "state",
});
PublicationState.hasMany(PublicationSearch, {
  foreignKey: "idPublicationState",
});

PublicationSearch.belongsTo(User, { foreignKey: "idUser", as: "user" });
User.hasMany(PublicationSearch, { foreignKey: "idUser" });

Trace.belongsTo(PublicationSearch, {
  foreignKey: "idPublicationSearch",
  as: "publication",
});
PublicationSearch.hasMany(Trace, {
  foreignKey: "idPublicationSearch",
  as: "traces",
});

Pet.hasMany(Information, { foreignKey: "idPet" });
Pet.hasMany(Vaccine, { foreignKey: "idPet" });
Pet.hasMany(Turn, { foreignKey: "idPet" });
Pet.belongsTo(User, { foreignKey: "idUser" });

Information.belongsTo(Pet, { foreignKey: "idPet" });
Vaccine.belongsTo(Pet, { foreignKey: "idPet" });
Turn.belongsTo(Pet, { foreignKey: "idPet" });
