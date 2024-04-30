import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import swaggerDefinition from "../../docs/swaggerDefinition.js";

const docsRouter = Router();

const swaggerOptions = swaggerJsdoc({
    swaggerDefinition,
    apis: ["src/docs/*.yml", "src/routes/api/*.js"],
});

docsRouter.use("/", swaggerUi.serve);

docsRouter.get(
    "/",
    swaggerUi.setup(swaggerOptions, {
        explorer: true,
    }),
);

export default docsRouter;
