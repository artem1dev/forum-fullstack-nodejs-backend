import { response, isExist } from "../middlewares/index.js";

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const isUserWithLoginExist = (Service) => async (req, res, next) => {
    const isLogin = await isExist(Service, "login", req.body.login);
    if (isLogin) {
        return response(409, { message: "User with this login already exists" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const isUserWithLoginNotExist = (Service) => async (req, res, next) => {
    const isLogin = await isExist(Service, "login", req.body.login);
    if (!isLogin) {
        return response(409, { message: "User with this login doesn't exists" }, res);
    }
    next();
};

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const isUserNotExist = (Service) => async (req, res, next) => {
    const isId = await isExist(Service, "_id", req.params.id);
    if (!isId) {
        return response(409, { message: "User with this id doesn't exists" }, res);
    }
    next();
};
