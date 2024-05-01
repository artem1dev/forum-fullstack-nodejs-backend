import { body } from "express-validator";
import { UserRolesConst } from "../middlewares/index.js";

const checkUserOnCreate = [
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
    body("role")
        .exists({ checkFalsy: true })
        .withMessage("Role must be provided")
        .custom((value) => UserRolesConst.includes(value))
        .withMessage("Invalid Role"),
];

const checkUserOnUpdate = [
    body("login")
        .optional()
        .isString()
        .withMessage("Login must be a string"),
    body("password")
        .optional()
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
    body("role")
        .optional()
        .custom((value) => UserRolesConst.includes(value))
        .withMessage("Invalid Role"),
];

export { checkUserOnCreate, checkUserOnUpdate };
