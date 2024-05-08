import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import postControllerV1_2 from "../../../posts/v1.2/post.controller.v1.2.js";
import PostServiceV1_2 from "../../../posts/v1.2/post.service.v1.2.js";
import { isPostNotExist } from "../../../posts/post.script.js";
import { validateRequestSchema, tryCatch, isAdmin, isAuthorized, isAdminOrAccess } from "../../../middlewares/index.js";
import { checkPostOnCreate, checkPostOnUpdate, checkLikeOnPostOnCreate } from "../../../validations/post.validation.js";

const postRouter = Router();

if (process.env.NODE_ENV !== "test") {
    postRouter.use(morgan("combined"));
}

postRouter.get("/", validateRequestSchema, tryCatch(postControllerV1_2.selectAll.bind(postControllerV1_2)));

postRouter.get(
    "/:id",
    validateRequestSchema,
    isPostNotExist(PostServiceV1_2),
    tryCatch(postControllerV1_2.selectById.bind(postControllerV1_2)),
);

postRouter.post(
    "/",
    isAuthorized,
    checkPostOnCreate,
    validateRequestSchema,
    tryCatch(postControllerV1_2.create.bind(postControllerV1_2)),
);

postRouter.post(
    "/:id/like",
    isAuthorized,
    checkLikeOnPostOnCreate,
    validateRequestSchema,
    isPostNotExist(PostServiceV1_2),
    tryCatch(postControllerV1_2.setLike.bind(postControllerV1_2)),
);

postRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    checkPostOnUpdate,
    validateRequestSchema,
    isPostNotExist(PostServiceV1_2),
    tryCatch(postControllerV1_2.update.bind(postControllerV1_2)),
);

postRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    validateRequestSchema,
    isPostNotExist(PostServiceV1_2),
    tryCatch(postControllerV1_2.delete.bind(postControllerV1_2)),
);

export default postRouter;
