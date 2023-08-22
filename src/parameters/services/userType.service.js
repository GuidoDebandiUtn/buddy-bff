import { UserType } from "../../models/UserType.js";
import { sequelize } from "../../database/database.js";

export async function createUserType(data) {
  const { userTypeName } = data;

  try {
    const userType = await UserType.create(
      {
        userTypeName: userTypeName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      { fields: ["userTypeName", "active", "createdDate", "updatedDate"] }
    );

    return userType;
  } catch (error) {
    throw error;
  }
}

export async function getAllUserTypes() {
  try {
    const query = `
    SELECT idUserType, userTypeName
    FROM usertypes
    WHERE active = true
    `;

    const userTypes = await sequelize.query(query, {
      model: UserType,
      mapToModel: true,
    });

    return userTypes;
  } catch (error) {
    throw error;
  }
}

export async function getUserTypeById(idUserType) {
  try {
    const query = `
    SELECT idUserType, userTypeName
    FROM usertypes
    WHERE idUserType = '${idUserType}'
    `;

    const userType = await sequelize.query(query, {
      model: UserType,
      mapToModel: true,
    });

    return userType;
  } catch (error) {
    throw error;
  }
}

export async function getUserTypeByName(userTypeName) {
  try {
    const query = `
    SELECT idUserType, userTypeName
    FROM usertypes
    WHERE userTypeName = '${userTypeName.toUpperCase()}'
    `;

    const userType = await sequelize.query(query, {
      model: UserType,
      mapToModel: true,
    });

    return userType;
  } catch (error) {
    throw error;
  }
}

export async function updateUserType(data, idUserType) {
  const { userTypeName } = data;

  try {
    await UserType.update(
      {
        userTypeName: userTypeName.toUpperCase(),
        updatedDate: new Date(),
      },
      { where: { idUserType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserType(idUserType) {
  try {
    await UserType.update(
      {
        active: false,
        updatedDate: new Date(),
      },
      { where: { idUserType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
