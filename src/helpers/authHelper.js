import jwt from "jsonwebtoken";

export async function getIdToken(token) {
  const tokenDecoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const idAuthor = tokenDecoded["idUser"];
  return idAuthor;
}
