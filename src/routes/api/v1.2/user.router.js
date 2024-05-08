import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import userControllerV1_2 from "../../../users/v1.2/user.controller.v1.2.js";
import UserServiceV1_2 from "../../../users/v1.2/user.service.v1.2.js";
import { isUserWithLoginExist, isUserNotExist } from "../../../users/user.script.js";
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
    tryCatch(userControllerV1_2.selectAll.bind(userControllerV1_2)),
);

userRouter.get(
    "/:id",
    validateRequestSchema,
    isUserNotExist(UserServiceV1_2),
    tryCatch(userControllerV1_2.selectById.bind(userControllerV1_2)),
);

userRouter.post(
    "/",
    isAuthorized,
    isAdmin,
    checkUserOnCreate,
    validateRequestSchema,
    isUserWithLoginExist(UserServiceV1_2),
    tryCatch(userControllerV1_2.create.bind(userControllerV1_2)),
);

userRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    checkUserOnUpdate,
    validateRequestSchema,
    isUserNotExist(UserServiceV1_2),
    tryCatch(userControllerV1_2.update.bind(userControllerV1_2)),
);

userRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    validateRequestSchema,
    isUserNotExist(UserServiceV1_2),
    tryCatch(userControllerV1_2.delete.bind(userControllerV1_2)),
);

export default userRouter;
