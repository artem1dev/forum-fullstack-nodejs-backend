import { response, isExist } from "../middlewares/index.js";

/**
 * Middleware to check if a user with the provided login already exists.
 * @param {Class} Service - The service class to use for user operations.
 * @returns {Function} Middleware function.
 */
export const isPostNotExist = (Service) => async (req, res, next) => {
    const isId = await isExist(Service, "_id", req.params.id);
    if (!isId) {
        return response(409, { message: "Post with this id doesn't exists" }, res);
    }
    next();
};
