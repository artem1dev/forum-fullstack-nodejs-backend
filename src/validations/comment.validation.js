import { body } from "express-validator";

const checkCommentOnCreate = [
    body("content")
        .exists({ checkFalsy: true })
        .withMessage("Content must be provided")
        .isString()
        .withMessage("Content must be a string"),
    body("parentId")
        .exists({ checkFalsy: true })
        .withMessage("parentId must be provided")
        .isInt()
        .withMessage("parentId must be a number"),
    body("postId")
        .exists({ checkFalsy: true })
        .withMessage("postId must be provided")
        .isInt()
        .withMessage("postId must be a number"),
];

const checkCommentOnUpdate = [
    body("content").optional().isString().withMessage("Content must be a string"),
    body("parentId").optional().isInt().withMessage("parentId must be a number"),
    body("postId").optional().isInt().withMessage("postId must be a number"),
];

const checkLikeOnCommentOnCreate = [
    body("like")
        .exists({ checkFalsy: true })
        .withMessage("like must be provided")
        .isBoolean()
        .withMessage("like must be a boolean"),
];

export { checkCommentOnCreate, checkCommentOnUpdate, checkLikeOnCommentOnCreate };
