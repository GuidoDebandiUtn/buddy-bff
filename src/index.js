import app from "./app.js";
import { sequelize } from "./database/database.js";
import { swaggerDocs } from "./swagger.js";
import "./models/Country.js";
import "./models/Document.js";
import "./models/Image.js";
import "./models/index.js";
import "./models/Information.js";
import "./models/Locality.js";
import "./models/Pet.js";
import "./models/PetBreed.js";
import "./models/PetColor.js";
import "./models/PetType.js";
import "./models/Province.js";
import "./models/Rating.js";
import "./models/Region.js";
import "./models/RevokedToken.js";
import "./models/Service.js";
import "./models/ServiceState.js";
import "./models/ServiceType.js";
import "./models/StateService.js";
import "./models/StateUser.js";
import "./models/Turn.js";
import "./models/User.js";
import "./models/UserState.js";
import "./models/UserType.js";
import "./models/Vaccine.js";

async function main() {
  await sequelize.sync({ alter: false });
  app.listen(4000, () => {
    console.log("Server on port 4000");
    swaggerDocs(app, 4000);
  });
}

main();
