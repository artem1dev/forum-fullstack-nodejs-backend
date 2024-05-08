import { body } from "express-validator";

const checkCommentOnCreate = [
    body("content")
        .exists({ checkFalsy: true })
        .withMessage("Content must be provided")
        .isString()
        .withMessage("Content must be a string"),
    body("parentId").optional(),
    body("postId")
        .exists({ checkFalsy: true })
        .withMessage("postId must be provided")
        .isString()
        .withMessage("postId must be a string"),
];

const checkCommentOnUpdate = [
    body("content").optional().isString().withMessage("Content must be a string"),
    body("parentId").optional().isString().withMessage("parentId must be a string"),
    body("postId").optional().isString().withMessage("postId must be a string"),
];

const checkLikeOnCommentOnCreate = [
    body("like").exists().withMessage("like must be provided").isBoolean().withMessage("like must be a boolean"),
];

export { checkCommentOnCreate, checkCommentOnUpdate, checkLikeOnCommentOnCreate };
