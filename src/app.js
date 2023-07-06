import express from "express";
import cors from "cors";
import morgan from "morgan";

import masterRouter from "./routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(masterRouter);

export default app;
