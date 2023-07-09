import { User } from "./User.js";
import { UserState } from "./UserState.js";
import { StateUser } from "./StateUser.js";

User.hasMany(StateUser, { foreignKey: User.idUser });

UserState.hasMany(StateUser, { foreignKey: UserState.idUserState });

StateUser.belongsTo(User, { foreignKey: User.idUser });
StateUser.belongsTo(UserState, { foreignKey: UserState.idUserState });
