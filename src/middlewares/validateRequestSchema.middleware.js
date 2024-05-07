import { validationResult } from "express-validator";

/**
 * Middleware to validate request schema using express-validator.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The next middleware function.
 * @returns Returns JSON response with validation errors if any, otherwise passes control to the next middleware.
 */
function validateRequestSchema(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default validateRequestSchema;
