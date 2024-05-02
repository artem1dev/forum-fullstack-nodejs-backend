import { body } from "express-validator";

/**
 * Validation chain method for user registration
 */
export const registerValidateChainMethod = [
    body("login")
        .exists({ checkFalsy: true })
        .withMessage("Login must be provided")
        .isString()
        .withMessage("Login must be a string"),
    body("password")
        .exists({ checkFalsy: true })
        .withMessage("Password must be provided")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long")
        .matches(/.*[a-zA-Z].*/)
        .withMessage("Password must contain at least one letter")
        .matches(/.*\d.*/)
        .withMessage("Password must contain at least one number")
        .matches(/.*[!@#\$%\^&\*]/)
        .withMessage("Password must contain at least one special character (!@#$%^&*)"),
    body("confirmPassword")
        .exists({ checkFalsy: true })
        .withMessage("Password confirmation must be provided")
        .isString()
        .withMessage("Password confirmation must be a string")
        .custom(async (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
        }),
];

/**
 * Validation chain method for user login
 */
export const loginValidateChainMethod = [
    body("login")
        .exists({ checkFalsy: true })
        .withMessage("Login must be provided")
        .isString()
        .withMessage("Login must be a string"),
    body("password")
        .exists({ checkFalsy: true })
        .withMessage("Password must be provided")
        .isString()
        .withMessage("Password must be a string"),
];
