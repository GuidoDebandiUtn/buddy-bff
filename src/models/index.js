import { Chat } from "./Chat.js";
import { Country } from "./Country.js";
import {} from "./Document.js";
import {} from "./Image.js";
import { Information } from "./Information.js";
import { Locality } from "./Locality.js";
import { Message } from "./Message.js";
import { Notification } from "./Notification.js";
import { Permission } from "./Permission.js";
import { Pet } from "./Pet.js";
import { PetBreed } from "./PetBreed.js";
import { PetColor } from "./PetColor.js";
import { PetType } from "./PetType.js";
import { Province } from "./Province.js";
import { PublicationAdoption } from "./PublicationAdoption.js";
import { PublicationSearch } from "./PublicationSearch.js";
import { PublicationState } from "./PublicationState.js";
import { Rating } from "./Rating.js";
import { Region } from "./Region.js";
import { Complaint } from "./Complaint.js";
// import { RevokedToken } from "./RevokedToken.js";
import { Role } from "./Role.js";
import { RolePermission } from "./RolePermission.js";
import { Service } from "./Service.js";
import { ServiceState } from "./ServiceState.js";
import { ServiceType } from "./ServiceType.js";
import { StateService } from "./StateService.js";
import { StateUser } from "./StateUser.js";
import { Trace } from "./Trace.js";
import { Turn } from "./Turn.js";
import { User } from "./User.js";
import { UserRole } from "./UserRole.js";
import { UserState } from "./UserState.js";
import { Vaccine } from "./Vaccine.js";

User.hasMany(StateUser, { foreignKey: "idUser" });
User.hasMany(Rating, { foreignKey: "idUser" });
User.hasMany(Pet, { foreignKey: "idUser" });
User.belongsTo(Locality, { foreignKey: "idLocality" });
User.hasMany(PublicationAdoption, { foreignKey: "idUser" });
User.hasMany(PublicationSearch, { foreignKey: "idUser" });
User.hasMany(UserRole, { foreignKey: "idUser" });
User.hasMany(Service, { foreignKey: "idUser" });

UserRole.belongsTo(User, { foreignKey: "idUser" });
UserRole.belongsTo(Role, { foreignKey: "idRole" });

Role.hasMany(UserRole, { foreignKey: "idRole" });
Role.hasMany(RolePermission, { foreignKey: "idRole" });

RolePermission.belongsTo(Role, { foreignKey: "idRole" });
RolePermission.belongsTo(Permission, { foreignKey: "idPermission" });

Permission.hasMany(RolePermission, { foreignKey: "idPermission" });

UserState.hasMany(StateUser, { foreignKey: "idUserState" });

StateUser.belongsTo(User, { foreignKey: "idUser" });
StateUser.belongsTo(UserState, { foreignKey: "idUserState" });

Locality.belongsTo(Region, { foreignKey: "idRegion" });
Locality.hasMany(User, { foreignKey: "idLocality" });
Locality.hasMany(PublicationAdoption, { foreignKey: "idLocality" });
Locality.hasMany(PublicationSearch, { foreignKey: "idLocality" });
Locality.hasMany(Service, { foreignKey: "idLocality" });

Region.hasMany(Locality, { foreignKey: "idRegion" });
Region.belongsTo(Province, { foreignKey: "idProvince" });

Province.hasMany(Region, { foreignKey: "idProvince" });
Province.belongsTo(Country, { foreignKey: "idCountry" });

Country.hasMany(Province, { foreignKey: "idCountry" });

PetType.hasMany(PetBreed, { foreignKey: "idPetType" });
PetType.hasMany(PublicationAdoption, { foreignKey: "idPetType" });
PetType.hasMany(PublicationSearch, { foreignKey: "idPetType" });
PetType.hasMany(Pet, { foreignKey: "idPetType" });

PetBreed.belongsTo(PetType, { foreignKey: "idPetType", as: "type" });
PetBreed.hasMany(PublicationAdoption, { foreignKey: "idPetBreed" });
PetBreed.hasMany(PublicationSearch, { foreignKey: "idPetBreed" });
PetBreed.hasMany(Pet, { foreignKey: "idPetBreed" });

Service.hasMany(StateService, { foreignKey: "idService" });
Service.belongsTo(ServiceType, { foreignKey: "idServiceType" });
Service.hasMany(Rating, { foreignKey: "idService" });
Service.belongsTo(User, { foreignKey: "idUser" });
Service.hasMany(Complaint, { foreignKey: "idService" });

ServiceState.hasMany(StateService, { foreignKey: "idServiceState" });

StateService.belongsTo(Service, { foreignKey: "idService" });
StateService.belongsTo(ServiceState, { foreignKey: "idServiceState" });

ServiceType.hasMany(Service, { foreignKey: "idServiceType" });

Rating.belongsTo(User, { foreignKey: "idUser" });
Rating.belongsTo(Service, { foreignKey: "idService" });

PublicationAdoption.belongsTo(PetColor, {
  foreignKey: "idPetColor",
  as: "color",
});
PublicationAdoption.belongsTo(PetBreed, {
  foreignKey: "idPetBreed",
  as: "breed",
});
PublicationAdoption.belongsTo(PetType, {
  foreignKey: "idPetType",
  as: "type",
});
PublicationAdoption.belongsTo(Locality, {
  foreignKey: "idLocality",
  as: "locality",
});
PublicationAdoption.belongsTo(PublicationState, {
  foreignKey: "idPublicationState",
  as: "state",
});
PublicationAdoption.belongsTo(User, { foreignKey: "idUser", as: "user" });
PublicationAdoption.hasMany(Complaint, { foreignKey: "idPublicationAdoption" });

PublicationSearch.belongsTo(PetColor, {
  foreignKey: "idPetColor",
  as: "color",
});
PublicationSearch.belongsTo(PetBreed, {
  foreignKey: "idPetBreed",
  as: "breed",
});
PublicationSearch.belongsTo(PetType, {
  foreignKey: "idPetType",
  as: "type",
});
PublicationSearch.belongsTo(Locality, {
  foreignKey: "idLocality",
  as: "locality",
});
PublicationSearch.belongsTo(PublicationState, {
  foreignKey: "idPublicationState",
  as: "state",
});
PublicationSearch.belongsTo(User, { foreignKey: "idUser", as: "user" });
PublicationSearch.hasMany(Complaint, { foreignKey: "idPublicationAdoption" });
PublicationSearch.hasMany(Trace, {
  foreignKey: "idPublicationSearch",
  as: "traces",
});

PetColor.hasMany(PublicationSearch, { foreignKey: "idPetColor" });
PetColor.hasMany(PublicationAdoption, { foreignKey: "idPetColor" });
PetColor.hasMany(Pet, { foreignKey: "idPetColor" });

PublicationState.hasMany(PublicationSearch, {
  foreignKey: "idPublicationState",
});
PublicationState.hasMany(PublicationAdoption, {
  foreignKey: "idPublicationState",
});

Trace.belongsTo(PublicationSearch, {
  foreignKey: "idPublicationSearch",
  as: "publication",
});

Pet.hasMany(Information, { foreignKey: "idPet" });
Pet.hasMany(Vaccine, { foreignKey: "idPet" });
Pet.hasMany(Turn, { foreignKey: "idPet" });
Pet.belongsTo(User, { foreignKey: "idUser" });
Pet.belongsTo(PetType, { foreignKey: "idPetType" });
Pet.belongsTo(PetBreed, { foreignKey: "idPetBreed" });
Pet.belongsTo(PetColor, { foreignKey: "idPetColor" });

Information.belongsTo(Pet, { foreignKey: "idPet" });
Vaccine.belongsTo(Pet, { foreignKey: "idPet" });
Turn.belongsTo(Pet, { foreignKey: "idPet" });

Complaint.belongsTo(Service, { foreignKey: "idService" });
Complaint.belongsTo(PublicationAdoption, { foreignKey: "idPublicationAdoption" });
Complaint.belongsTo(PublicationSearch, { foreignKey: "idPublicationSearch" });
