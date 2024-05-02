import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import commentControllerV1_1 from "../../../comments/v1.1/comment.controller.v1.1.js";
import CommentServiceV1_1 from "../../../comments/v1.1/comment.service.v1.1.js";
import { isCommentNotExist } from "../../../comments/comment.script.js";
import { validateRequestSchema, tryCatch, isAuthorized, isAdminOrAccess } from "../../../middlewares/index.js";
import { checkCommentOnCreate, checkCommentOnUpdate, checkLikeOnCommentOnCreate } from "../../../validations/comment.validation.js";

const commentRouter = Router();

if (process.env.NODE_ENV !== "test") {
    commentRouter.use(morgan("combined"));
}

commentRouter.get(
    "/",
    validateRequestSchema,
    tryCatch(commentControllerV1_1.selectAll.bind(commentControllerV1_1)),
);

commentRouter.get(
    "/:id",
    validateRequestSchema,
    isCommentNotExist(CommentServiceV1_1),
    tryCatch(commentControllerV1_1.selectById.bind(commentControllerV1_1)),
);

commentRouter.post(
    "/",
    isAuthorized,
    checkCommentOnCreate,
    validateRequestSchema,
    tryCatch(commentControllerV1_1.create.bind(commentControllerV1_1)),
);

commentRouter.post(
    "/:id/like",
    isAuthorized,
    checkLikeOnCommentOnCreate,
    validateRequestSchema,
    isCommentNotExist(CommentServiceV1_1),
    tryCatch(commentControllerV1_1.setLike.bind(commentControllerV1_1)),
);

commentRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    checkCommentOnUpdate,
    validateRequestSchema,
    isCommentNotExist(CommentServiceV1_1),
    tryCatch(commentControllerV1_1.update.bind(commentControllerV1_1)),
);

commentRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    validateRequestSchema,
    isCommentNotExist(CommentServiceV1_1),
    tryCatch(commentControllerV1_1.delete.bind(commentControllerV1_1)),
);

export default commentRouter;
