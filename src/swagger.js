import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BUDDY! API",
      version: "1.0.0",
      description: "API de la aplicación BUDDY!",
    },
  },
  servers: [{ url: "http://localhost:4000" }],
  apis: [
    "src/security/routes/*.routes.js",
    "src/parameters/routes/*.routes.js",
  ],
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app, port) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
