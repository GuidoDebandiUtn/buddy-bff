import { Chat } from "./Chat.js";
import { Complaint } from "./Complaint.js";
import { Country } from "./Country.js";
import {Document} from "./Document.js";
// import {} from "./Image.js";
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
// import { RevokedToken } from "./RevokedToken.js";
import { Role } from "./Role.js";
import { RolePermission } from "./RolePermission.js";
import { Service } from "./Service.js";
import { ServicePet } from "./ServicePet.js";
import { ServiceState } from "./ServiceState.js";
import { ServiceType } from "./ServiceType.js";
import { StatePublication } from "./StatePublication.js";
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
User.hasMany(Chat, { foreignKey: "idUserEmitter" });
User.hasMany(Notification, { foreignKey: "idUser" });

User.hasMany(Document, { foreignKey: "idUser" });
Document.belongsTo(User, { foreignKey: "idUser" });

Chat.belongsTo(User, { foreignKey: "idUserEmitter" });
Chat.hasMany(Message, { foreignKey: "idChat" });

Message.belongsTo(Chat, { foreignKey: "idChat" });

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
PetType.hasMany(ServicePet, { foreignKey: "idPetType" });

PetBreed.belongsTo(PetType, { foreignKey: "idPetType" });
PetBreed.hasMany(PublicationAdoption, { foreignKey: "idPetBreed" });
PetBreed.hasMany(PublicationSearch, { foreignKey: "idPetBreed" });
PetBreed.hasMany(Pet, { foreignKey: "idPetBreed" });

Service.hasMany(StateService, { foreignKey: "idService" });
Service.belongsTo(ServiceType, { foreignKey: "idServiceType" });
Service.hasMany(Rating, { foreignKey: "idService" });
Service.belongsTo(User, { foreignKey: "idUser" });
Service.hasMany(Complaint, { foreignKey: "idService" });
Service.hasMany(ServicePet, { foreignKey: "idService" });

ServicePet.belongsTo(Service, { foreignKey: "idService" });
ServicePet.belongsTo(PetType, { foreignKey: "idPetType" });

ServiceState.hasMany(StateService, { foreignKey: "idServiceState" });

StateService.belongsTo(Service, { foreignKey: "idService" });
StateService.belongsTo(ServiceState, { foreignKey: "idServiceState" });

ServiceType.hasMany(Service, { foreignKey: "idServiceType" });

Rating.belongsTo(User, { foreignKey: "idUser" });
Rating.belongsTo(Service, { foreignKey: "idService" });

PublicationAdoption.belongsTo(PetColor, {
  foreignKey: "idPetColor",
});
PublicationAdoption.belongsTo(PetBreed, {
  foreignKey: "idPetBreed",
});
PublicationAdoption.belongsTo(PetType, {
  foreignKey: "idPetType",
});
PublicationAdoption.belongsTo(Locality, {
  foreignKey: "idLocality",
});
PublicationAdoption.hasMany(StatePublication, {
  foreignKey: "idPublicationAdoption",
});
PublicationAdoption.belongsTo(User, { foreignKey: "idUser" });
PublicationAdoption.hasMany(Complaint, { foreignKey: "idPublicationAdoption" });
PublicationAdoption.belongsTo(PublicationState, {
  foreignKey: "idPublicationState",
});

PublicationSearch.belongsTo(PetColor, {
  foreignKey: "idPetColor",
});
PublicationSearch.belongsTo(PetBreed, {
  foreignKey: "idPetBreed",
});
PublicationSearch.belongsTo(PetType, {
  foreignKey: "idPetType",
});
PublicationSearch.belongsTo(Locality, {
  foreignKey: "idLocality",
});
PublicationSearch.hasMany(StatePublication, {
  foreignKey: "idPublicationSearch",
});

PublicationSearch.belongsTo(User, { foreignKey: "idUser" });
PublicationSearch.hasMany(Complaint, { foreignKey: "idPublicationSearch" });
PublicationSearch.hasMany(Trace, {
  foreignKey: "idPublicationSearch",
});
PublicationSearch.belongsTo(PublicationState, {
  foreignKey: "idPublicationState",
});

PetColor.hasMany(PublicationSearch, { foreignKey: "idPetColor" });
PetColor.hasMany(PublicationAdoption, { foreignKey: "idPetColor" });
PetColor.hasMany(Pet, { foreignKey: "idPetColor" });

PublicationState.hasMany(StatePublication, {
  foreignKey: "idPublicationState",
});
PublicationState.hasMany(PublicationAdoption, {
  foreignKey: "idPublicationState",
});
PublicationState.hasMany(PublicationSearch, {
  foreignKey: "idPublicationState",
});

StatePublication.belongsTo(PublicationAdoption, {
  foreignKey: "idPublicationAdoption",
});
StatePublication.belongsTo(PublicationSearch, {
  foreignKey: "idPublicationSearch",
});
StatePublication.belongsTo(PublicationState, {
  foreignKey: "idPublicationState",
});

Trace.belongsTo(PublicationSearch, {
  foreignKey: "idPublicationSearch",
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
Complaint.belongsTo(PublicationAdoption, {
  foreignKey: "idPublicationAdoption",
});
Complaint.belongsTo(PublicationSearch, { foreignKey: "idPublicationSearch" });



Notification.belongsTo(User, { foreignKey: "idUser" });