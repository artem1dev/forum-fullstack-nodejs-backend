import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import commentControllerV1_1 from "../../../comments/v1.1/comment.controller.v1.1.js";
import { validateRequestSchema, tryCatch } from "../../../middlewares/index.js";
//import { checkUserOnCreate, checkUserOnUpdate } from "../../validations/user.validation.js";

const commentRouter = Router();

if (process.env.NODE_ENV !== "test") {
    commentRouter.use(morgan("combined"));
}

commentRouter.get(
    "/",
    //isAdmin
    validateRequestSchema,
    tryCatch(commentControllerV1_1.selectAll.bind(commentControllerV1_1)),
);

commentRouter.get(
    "/:id",
    validateRequestSchema,
    tryCatch(commentControllerV1_1.selectById.bind(commentControllerV1_1)),
);

commentRouter.post(
    "/",
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(commentControllerV1_1.create.bind(commentControllerV1_1)),
);

commentRouter.patch(
    "/:id",
    //isAdmin,
    //checkUserOnUpdate,
    validateRequestSchema,
    tryCatch(commentControllerV1_1.update.bind(commentControllerV1_1)),
);

commentRouter.delete(
    "/:id",
    //isAdmin,
    validateRequestSchema,
    tryCatch(commentControllerV1_1.delete.bind(commentControllerV1_1)),
);

export default commentRouter;
