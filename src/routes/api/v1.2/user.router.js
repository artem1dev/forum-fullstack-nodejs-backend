import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import userControllerV1_2 from "../../../users/v1.2/user.controller.v1.2.js";
import { validateRequestSchema, tryCatch, isAdmin, isAuthorized } from "../../../middlewares/index.js";
import { checkUserOnCreate, checkUserOnUpdate } from "../../../validations/user.validation.js";

const userRouter = Router();

if (process.env.NODE_ENV !== "test") {
    userRouter.use(morgan("combined"));
}

userRouter.get(
    "/",
    //isAdmin
    validateRequestSchema,
    tryCatch(userControllerV1_2.selectAll.bind(userControllerV1_2)),
);

userRouter.get("/:id", validateRequestSchema, tryCatch(userControllerV1_2.selectById.bind(userControllerV1_2)));

userRouter.post(
    "/",
    //isAdmin,
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(userControllerV1_2.create.bind(userControllerV1_2)),
);

userRouter.patch(
    "/:id",
    //isAdmin,
    //checkUserOnUpdate,
    validateRequestSchema,
    tryCatch(userControllerV1_2.update.bind(userControllerV1_2)),
);

userRouter.delete(
    "/:id",
    //isAdmin,
    validateRequestSchema,
    tryCatch(userControllerV1_2.delete.bind(userControllerV1_2)),
);

export default userRouter;
