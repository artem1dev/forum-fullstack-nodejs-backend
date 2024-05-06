import jwt from "jsonwebtoken";
import mongoSanitize from "express-mongo-sanitize";
import "dotenv/config";

import UserServiceV1_1 from "./v1.1/user.service.v1.1.js";
import { hashPassword } from "../middlewares/index.js";

/**
 * Controller class for user-related operations.
 * @class
 */
export class AuthController {
    constructor() {
        this.service = new UserServiceV1_1();
    }

    /**
     * Registers a new user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async register(req, res) {
        mongoSanitize.sanitize(req.body);
        const { body } = req;
        const encryptedPass = await hashPassword(body.password);
        const userData = {
            login: body.login,
            password: encryptedPass,
            role: "user",
        };
        const result = await this.service.create(userData);
        return { code: result.code, values: result.values };
    }

    /**
     * Log in a user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async login(req, res) {
        mongoSanitize.sanitize(req.body);
        const { body } = req;
        const userResponse = await this.service.selectByLogin(body.login);
        if (userResponse.code != 200) {
            return { code: userResponse.code, values: userResponse.values };
        }
        const user = userResponse.values;
        const password = await hashPassword(body.password);
        if (password !== user.password) {
            return { code: 400, values: "Password do not match" };
        }
        const token = jwt.sign(
            {
                userId: user.id,
                login: user.login,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
        );
        const data = {
            userData: {
                userId: user.id,
                login: user.login,
                role: user.role,
            },
            token,
        };
        return { code: 200, values: data };
    }
}

const authController = new AuthController();

export default authController;
