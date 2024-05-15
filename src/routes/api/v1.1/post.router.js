import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import postControllerV1_1 from "../../../posts/v1.1/post.controller.v1.1.js";
import PostServiceV1_1 from "../../../posts/v1.1/post.service.v1.1.js";
import { isPostNotExist } from "../../../posts/post.middleware.js";
import { validateRequestSchema, tryCatch, isAuthorized, isAdminOrAccess } from "../../../middlewares/index.js";
import { checkPostOnCreate, checkPostOnUpdate, checkLikeOnPostOnCreate } from "../../../validations/post.validation.js";

const postRouter = Router();

if (process.env.NODE_ENV !== "test") {
    postRouter.use(morgan("combined"));
}

postRouter.get("/", validateRequestSchema, tryCatch(postControllerV1_1.selectAll.bind(postControllerV1_1)));

postRouter.get(
    "/:id",
    validateRequestSchema,
    isPostNotExist(PostServiceV1_1),
    tryCatch(postControllerV1_1.selectById.bind(postControllerV1_1)),
);

postRouter.get("/user/:id", validateRequestSchema, tryCatch(postControllerV1_1.selectByUserId.bind(postControllerV1_1)));

postRouter.post(
    "/",
    isAuthorized,
    checkPostOnCreate,
    validateRequestSchema,
    tryCatch(postControllerV1_1.create.bind(postControllerV1_1)),
);

postRouter.post(
    "/:id/like",
    isAuthorized,
    checkLikeOnPostOnCreate,
    validateRequestSchema,
    isPostNotExist(PostServiceV1_1),
    tryCatch(postControllerV1_1.setLike.bind(postControllerV1_1)),
);

postRouter.patch(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    checkPostOnUpdate,
    validateRequestSchema,
    isPostNotExist(PostServiceV1_1),
    tryCatch(postControllerV1_1.update.bind(postControllerV1_1)),
);

postRouter.delete(
    "/:id",
    isAuthorized,
    isAdminOrAccess,
    validateRequestSchema,
    isPostNotExist(PostServiceV1_1),
    tryCatch(postControllerV1_1.delete.bind(postControllerV1_1)),
);

export default postRouter;
