import { Router } from "express";
import morgan from "morgan";
import "dotenv/config";

import postControllerV1_1 from "../../../posts/v1.1/post.controller.v1.1.js";
import { validateRequestSchema, tryCatch, isAdmin, isAuthorized } from "../../../middlewares/index.js";
//import { checkUserOnCreate, checkUserOnUpdate } from "../../validations/post.validation.js";

const postRouter = Router();

if (process.env.NODE_ENV !== "test") {
    postRouter.use(morgan("combined"));
}

postRouter.get(
    "/",
    //isAdmin
    validateRequestSchema,
    tryCatch(postControllerV1_1.selectAll.bind(postControllerV1_1)),
);

postRouter.get(
    "/:id",
    validateRequestSchema,
    tryCatch(postControllerV1_1.selectById.bind(postControllerV1_1)),
);

postRouter.post(
    "/",
    isAuthorized,
    //isAdmin,
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(postControllerV1_1.create.bind(postControllerV1_1)),
);

postRouter.post(
    "/:id/like",
    isAuthorized,
    //isAdmin,
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(postControllerV1_1.setLike.bind(postControllerV1_1)),
);

postRouter.patch(
    "/:id",
    isAuthorized,
    //isAdmin,
    //checkUserOnUpdate,
    validateRequestSchema,
    tryCatch(postControllerV1_1.update.bind(postControllerV1_1)),
);

postRouter.delete(
    "/:id",
    isAuthorized,
    //isAdmin,
    validateRequestSchema,
    tryCatch(postControllerV1_1.delete.bind(postControllerV1_1)),
);

postRouter.delete(
    "/:id/like",
    isAuthorized,
    //isAdmin,
    //checkUserOnCreate,
    validateRequestSchema,
    tryCatch(postControllerV1_1.deleteLike.bind(postControllerV1_1)),
);

export default postRouter;
