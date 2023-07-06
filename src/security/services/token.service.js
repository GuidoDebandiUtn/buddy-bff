import { RevokedToken } from "../../models/RevokedToken.js";

export async function insertToken(token) {
  try {
    await RevokedToken.create({ token });
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function findToken(token) {
  try {
    const authToken = await RevokedToken.findOne({ where: { token } });
    return authToken;
  } catch (error) {
    console.error(error);
  }
}
