import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import commentControllerV1_2 from "../../../comments/v1.2/comment.controller.v1.2.js";
import { validateRequestSchema, tryCatch } from "../../../middlewares/index.js";
//import { checkUserOnCreate, checkUserOnUpdate } from "../../validations/user.validation.js";

const authRouter = Router();

if (process.env.NODE_ENV !== "test") {
    authRouter.use(morgan("combined"));
}

authRouter.post(
    "/register",
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(commentControllerV1_2.create.bind(commentControllerV1_2)),
);

authRouter.post(
    "/login",
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(commentControllerV1_2.create.bind(commentControllerV1_2)),
);

export default authRouter;
