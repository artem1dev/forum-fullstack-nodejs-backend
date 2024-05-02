import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import commentControllerV1_2 from "../../../comments/v1.2/comment.controller.v1.2.js";
import { validateRequestSchema, tryCatch, isAdmin, isAuthorized } from "../../../middlewares/index.js";
import { checkCommentOnCreate, checkCommentOnUpdate } from "../../../validations/comment.validation.js";

const commentRouter = Router();

if (process.env.NODE_ENV !== "test") {
    commentRouter.use(morgan("combined"));
}

commentRouter.get(
    "/",
    //isAdmin
    validateRequestSchema,
    tryCatch(commentControllerV1_2.selectAll.bind(commentControllerV1_2)),
);

commentRouter.get("/:id", validateRequestSchema, tryCatch(commentControllerV1_2.selectById.bind(commentControllerV1_2)));

commentRouter.post(
    "/",
    checkCommentOnCreate,
    validateRequestSchema,
    tryCatch(commentControllerV1_2.create.bind(commentControllerV1_2)),
);

commentRouter.patch(
    "/:id",
    //isAdmin,
    checkCommentOnUpdate,
    validateRequestSchema,
    tryCatch(commentControllerV1_2.update.bind(commentControllerV1_2)),
);

commentRouter.delete(
    "/:id",
    //isAdmin,
    validateRequestSchema,
    tryCatch(commentControllerV1_2.delete.bind(commentControllerV1_2)),
);

export default commentRouter;
