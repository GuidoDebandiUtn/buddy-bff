import express from "express";
import cors from "cors";
import morgan from "morgan";

import { fileURLToPath } from "url";
import { dirname } from "path";

import masterRouter from "./routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const statics = `${__dirname}/public`;

//console.log(statics);

app.use(express.static(statics));

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("views", "./src/public/views");

app.set("port", process.env.PORT || 4000);

app.set("view engine", "pug");

app.use(masterRouter);

export default app;
