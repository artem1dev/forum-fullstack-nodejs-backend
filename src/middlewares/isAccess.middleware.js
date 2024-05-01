import jwt from "jsonwebtoken";
import "dotenv/config";

import response from "./response.middleware.js";

/**
 * Middleware to check if the user is an admin.
 * @param {import("express").Request} req The Express request object.
 * @param {import("express").Response} res The Express response object.
 * @param {import("express").NextFunction} next The next middleware function.
 * @returns {void}
 */
export const isAdmin = (req, res, next) => {
    const { token } = req.headers;
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    if (userData.role !== "admin") {
        return response(403, { message: "Access denied" }, res);
    }
    next();
};

/**
 * Middleware to check if the user is authorized.
 * @param {import("express").Request} req The Express request object.
 * @param {import("express").Response} res The Express response object.
 * @param {import("express").NextFunction} next The next middleware function.
 * @returns {void}
 */
export const isAuthorized = (req, res, next) => {
    const { token } = req.headers;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        response(401, { message: "Unauthorized user" }, res);
    }
};
