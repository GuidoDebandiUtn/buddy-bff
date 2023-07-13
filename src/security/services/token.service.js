import { RevokedToken } from "../../models/RevokedToken.js";

export async function insertToken(token) {
  try {
    await RevokedToken.create({ token });
    return;
  } catch (error) {
    throw error;
  }
}

export async function findToken(token) {
  try {
    const authToken = await RevokedToken.findOne({ where: { token } });
    return authToken;
  } catch (error) {
    throw error;
  }
}
