import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import authController from "../../users/auth.controller.js";
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
    tryCatch(authController.register.bind(authController)),
);

authRouter.post(
    "/login",
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(authController.login.bind(authController)),
);

export default authRouter;
