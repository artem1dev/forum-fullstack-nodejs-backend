import logger from "../config/logger.js";
import response from "./response.middleware.js";

/**
 * Wraps an asynchronous controller function with a try-catch block to handle errors.
 * @param controller - The controller function to be executed.
 * @returns Returns an Express middleware function.
 */
export const tryCatch = (controller) => async (req, res, next) => {
    try {
        const result = await controller(req, res);
        if (result) {
            response(result.code, result.values, res);
        } else {
            response(200, { values: "Success" }, res);
        }
    } catch (error) {
        response(500, { error }, res);
        return next(error);
    }
};

/**
 * Wraps an asynchronous controller function with a try-catch block to handle errors and provide pagination metadata.
 * @param {Function} controller The controller function to be executed.
 * @returns {Function} Returns an Express middleware function.
 */
export const tryCatchPagination = (controller) => async (req, res, next) => {
    try {
        const result = await controller(req, res);
        if (result) {
            response(
                result.code,
                {
                    meta: { currentPage: result.currentPage, totalItems: result.totalItems, totalPages: result.totalPages },
                    values: result.values,
                },
                res,
            );
        } else {
            response(200, { values: "Success" }, res);
        }
    } catch (error) {
        response(500, { error: error }, res);
        return next(error);
    }
};
