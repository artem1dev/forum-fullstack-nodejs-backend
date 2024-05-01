import { body } from "express-validator";

const checkPostOnCreate = [
    body("title")
        .exists({ checkFalsy: true })
        .withMessage("Title must be provided")
        .isString()
        .withMessage("Title must be a string"),
    body("content")
        .exists({ checkFalsy: true })
        .withMessage("Content must be provided")
        .isString()
        .withMessage("Content must be a string"),
    body("userId")
        .exists({ checkFalsy: true })
        .withMessage("userId must be provided")
        .isInt()
        .withMessage("userId must be a number"),
];

const checkPostOnUpdate = [
    body("title")
        .optional()
        .isString()
        .withMessage("Title must be a string"),
    body("content")
        .optional()
        .isString()
        .withMessage("Content must be a string"),
    body("status")
        .optional()
        .isString()
        .withMessage("Status must be a string"),
    body("userId")
        .optional()
        .isInt()
        .withMessage("userId must be a number"),
];

export { checkPostOnCreate, checkPostOnUpdate };