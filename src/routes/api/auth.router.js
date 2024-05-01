import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import authController from "../../users/auth.controller.js";
import { validateRequestSchema, tryCatch } from "../../middlewares/index.js";
import { registerValidateChainMethod, loginValidateChainMethod } from "../../validations/auth.validation.js";

const authRouter = Router();

if (process.env.NODE_ENV !== "test") {
    authRouter.use(morgan("combined"));
}

authRouter.post(
    "/register",
    registerValidateChainMethod,
    validateRequestSchema,
    tryCatch(authController.register.bind(authController)),
);

authRouter.post(
    "/login",
    loginValidateChainMethod,
    validateRequestSchema,
    tryCatch(authController.login.bind(authController)),
);

export default authRouter;
