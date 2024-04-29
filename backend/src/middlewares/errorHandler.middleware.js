import response from "./response.middleware.js";

/**
 * Error handler middleware to send error response with status 400.
 * @param {Error} error - The error object.
 * @param {import("express").Request} req - The request object.
 * @param {import("express").Response} res - The response object.
 * @param {import("express").NextFunction} next - The next function.
 */
const errorHandler = (error, req, res, next) => {
    response(500, { message: error.message }, res);
};

export default errorHandler;
