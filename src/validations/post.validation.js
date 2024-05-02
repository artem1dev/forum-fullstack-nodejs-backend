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
];

const checkLikeOnPostOnCreate= [
    body("like")
        .exists({ checkFalsy: true })
        .withMessage("like must be provided")
        .isBoolean()
        .withMessage("like must be a boolean"),
];

export { checkPostOnCreate, checkPostOnUpdate, checkLikeOnPostOnCreate };