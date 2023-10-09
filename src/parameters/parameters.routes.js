import { Router } from "express";
import countryRoutes from "./routes/country.routes.js";
import provinceRoutes from "./routes/province.routes.js";
import regionRoutes from "./routes/region.routes.js";
import localityRoutes from "./routes/locality.routes.js";
import petTypeRoutes from "./routes/petType.routes.js";
import petBreedRoutes from "./routes/petBreed.routes.js";
import petColorRoutes from "./routes/petColor.routes.js";


const router = Router();

router.use("/country", countryRoutes);
router.use("/province", provinceRoutes);
router.use("/region", regionRoutes);
router.use("/locality", localityRoutes);
router.use("/petType", petTypeRoutes);
router.use("/petBreed", petBreedRoutes);
router.use("/petColor", petColorRoutes);


export default router;
