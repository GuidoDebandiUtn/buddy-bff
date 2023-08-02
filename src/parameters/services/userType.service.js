import { UserType } from "../../models/UserType.js";

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
    const userTypes = await UserType.findAll({
      attributes: ["userTypeName"],
      where: { active: true },
    });

    return userTypes;
  } catch (error) {
    throw error;
  }
}

export async function getUserTypeById(idUserType) {
  try {
    const userType = await UserType.findOne({
      attributes: ["idUserType", "userTypeName"],
      where: { idUserType, active: true },
    });

    return userType;
  } catch (error) {
    throw error;
  }
}

export async function getUserTypeByName(userTypeName) {
  try {
    const userType = await UserType.findOne({
      attributes: ["idUserType", "userTypeName"],
      where: { userTypeName: userTypeName.toUpperCase(), active: true },
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
