import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import userControllerV1_1 from "../../../users/v1.1/user.controller.v1.1.js";
import UserServiceV1_1 from "../../../users/v1.1/user.service.v1.1.js";
import { isUserWithLoginExist, isUserNotExist } from "../../../users/user.middleware.js";
import { validateRequestSchema, tryCatch, isAdmin, isAuthorized, isAdminOrAccess } from "../../../middlewares/index.js";
import { checkUserOnCreate, checkUserOnUpdate } from "../../../validations/user.validation.js";

const userRouter = Router();

if (process.env.NODE_ENV !== "test") {
    userRouter.use(morgan("combined"));
}

userRouter.get(
    "/",
    isAuthorized,
    isAdmin,
    validateRequestSchema,
    tryCatch(userControllerV1_1.selectAll.bind(userControllerV1_1)),
);

userRouter.get(
    "/:id",
    validateRequestSchema,
    isUserNotExist(UserServiceV1_1),
    tryCatch(userControllerV1_1.selectById.bind(userControllerV1_1)),
);

userRouter.post(
    "/",
    isAuthorized,
    isAdmin,
    checkUserOnCreate,
    validateRequestSchema,
    isUserWithLoginExist(UserServiceV1_1),
    tryCatch(userControllerV1_1.create.bind(userControllerV1_1)),
);

userRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    checkUserOnUpdate,
    validateRequestSchema,
    isUserNotExist(UserServiceV1_1),
    tryCatch(userControllerV1_1.update.bind(userControllerV1_1)),
);

userRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    validateRequestSchema,
    isUserNotExist(UserServiceV1_1),
    tryCatch(userControllerV1_1.delete.bind(userControllerV1_1)),
);

export default userRouter;
