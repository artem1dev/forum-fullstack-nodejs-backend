import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import authController from "../../users/auth.controller.js";
import UserServiceV1_1 from "../../users/v1.1/user.service.v1.1.js";
import { isUserWithLoginExist, isUserWithLoginNotExist } from "../../users/user.middleware.js";
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
    isUserWithLoginExist(UserServiceV1_1),
    tryCatch(authController.register.bind(authController)),
);

authRouter.post(
    "/login",
    loginValidateChainMethod,
    validateRequestSchema,
    isUserWithLoginNotExist(UserServiceV1_1),
    tryCatch(authController.login.bind(authController)),
);

export default authRouter;
