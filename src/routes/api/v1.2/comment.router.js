import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import commentControllerV1_2 from "../../../comments/v1.2/comment.controller.v1.2.js";
import CommentServiceV1_2 from "../../../comments/v1.2/comment.service.v1.2.js";
import { isCommentNotExist } from "../../../comments/comment.script.js";
import { validateRequestSchema, tryCatch, isAdmin, isAuthorized, isAdminOrAccess } from "../../../middlewares/index.js";
import {
    checkCommentOnCreate,
    checkCommentOnUpdate,
    checkLikeOnCommentOnCreate,
} from "../../../validations/comment.validation.js";

const commentRouter = Router();

if (process.env.NODE_ENV !== "test") {
    commentRouter.use(morgan("combined"));
}

commentRouter.get("/", validateRequestSchema, tryCatch(commentControllerV1_2.selectAll.bind(commentControllerV1_2)));

commentRouter.get(
    "/:id",
    validateRequestSchema,
    isCommentNotExist(CommentServiceV1_2),
    tryCatch(commentControllerV1_2.selectById.bind(commentControllerV1_2)),
);

commentRouter.post(
    "/",
    isAuthorized,
    checkCommentOnCreate,
    validateRequestSchema,
    tryCatch(commentControllerV1_2.create.bind(commentControllerV1_2)),
);

commentRouter.post(
    "/:id/like",
    isAuthorized,
    checkLikeOnCommentOnCreate,
    validateRequestSchema,
    isCommentNotExist(CommentServiceV1_2),
    tryCatch(commentControllerV1_2.setLike.bind(commentControllerV1_2)),
);

commentRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    checkCommentOnUpdate,
    validateRequestSchema,
    isCommentNotExist(CommentServiceV1_2),
    tryCatch(commentControllerV1_2.update.bind(commentControllerV1_2)),
);

commentRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    validateRequestSchema,
    isCommentNotExist(CommentServiceV1_2),
    tryCatch(commentControllerV1_2.delete.bind(commentControllerV1_2)),
);

export default commentRouter;
