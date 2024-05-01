import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import postControllerV1_2 from "../../../posts/v1.2/post.controller.v1.2.js";
import { validateRequestSchema, tryCatch, isAdmin, isAuthorized } from "../../../middlewares/index.js";
import { checkPostOnCreate, checkPostOnUpdate } from "../../../validations/post.validation.js";

const postRouter = Router();

if (process.env.NODE_ENV !== "test") {
    postRouter.use(morgan("combined"));
}

postRouter.get(
    "/",
    //isAdmin
    validateRequestSchema,
    tryCatch(postControllerV1_2.selectAll.bind(postControllerV1_2)),
);

postRouter.get(
    "/:id",
    validateRequestSchema,
    tryCatch(postControllerV1_2.selectById.bind(postControllerV1_2)),
);

postRouter.post(
    "/",
    //isAdmin,
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(postControllerV1_2.create.bind(postControllerV1_2)),
);

postRouter.patch(
    "/:id",
    //isAdmin,
    //checkUserOnUpdate,
    validateRequestSchema,
    tryCatch(postControllerV1_2.update.bind(postControllerV1_2)),
);

postRouter.delete(
    "/:id",
    //isAdmin,
    validateRequestSchema,
    tryCatch(postControllerV1_2.delete.bind(postControllerV1_2)),
);

export default postRouter;
