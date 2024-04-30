import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import { validateRequestSchema, tryCatch } from "../../middlewares/index.js";
//import { checkUserOnCreate, checkUserOnUpdate } from "../../validations/user.validation.js";

const authRouter = Router();

if (process.env.NODE_ENV !== "test") {
    authRouter.use(morgan("combined"));
}

authRouter.post(
    "/register",
    //checkUserOnCreate,
    validateRequestSchema,
);

authRouter.post(
    "/login",
    //checkUserOnCreate,
    validateRequestSchema,
);

export default authRouter;
