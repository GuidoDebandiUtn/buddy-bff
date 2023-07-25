import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/User.js";
import "./models/RevokedToken.js";
import "./models/UserState.js";
import "./models/StateUser.js";
import "./models/Country.js";
import "./models/Province.js";
import "./models/Region.js";
import "./models/Locality.js";
import "./models/PetBreed.js";
import "./models/PetColor.js";
import "./models/PetType.js";
import "./models/ServiceType.js";
import "./models/index.js";

async function main() {
  await sequelize.sync({ force: false });
  app.listen(4000);
  console.log("Server on port 4000");
}

main();
