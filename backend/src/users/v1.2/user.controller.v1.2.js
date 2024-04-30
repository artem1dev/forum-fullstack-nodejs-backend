import UserServiceV1_2 from "./user.service.v1.2.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Controller class for user-related operations.
 * @class
 */
export class UserControllerV1_2 {
    constructor() {
        this.service = new UserServiceV1_2();
    }

    /**
     * Retrieves all users.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {

    }

    /**
     * Retrieves a user by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectById(req, res) {

    }

    /**
     * Creates a new user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {

    }

    /**
     * Updates an existing user.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async update(req, res) {

    }

    /**
     * Deletes a user by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async delete(req, res) {

    }
}

const userControllerV1_2 = new UserControllerV1_2();

export default userControllerV1_2;