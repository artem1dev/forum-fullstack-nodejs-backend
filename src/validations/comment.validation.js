import { body } from "express-validator";


const checkCommentOnCreate = [
    body("content")
        .exists({ checkFalsy: true })
        .withMessage("Login must be provided")
        .isString()
        .withMessage("Login must be a string"),
    body("parentId")
        .exists({ checkFalsy: true })
        .withMessage("parentId must be provided")
        .isString()
        .withMessage("parentId must be a string"),
    body("postId")
        .exists({ checkFalsy: true })
        .withMessage("postId must be provided")
        .isString()
        .withMessage("postId must be a string"),
];

const checkCommentOnUpdate = [
    body("content")
        .optional()
        .isString()
        .withMessage("Login must be a string"),
    body("parentId")
        .optional()
        .isString()
        .withMessage("parentId must be a string"),
    body("postId")
        .optional()
        .isString()
        .withMessage("postId must be a string"),
];

export { checkCommentOnCreate, checkCommentOnUpdate };