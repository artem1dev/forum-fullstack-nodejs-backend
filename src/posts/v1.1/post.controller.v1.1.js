import mongoSanitize from "express-mongo-sanitize";
import jwt from "jsonwebtoken";
import "dotenv/config";

import PostServiceV1_1 from "./post.service.v1.1.js";

/**
 * Controller class for post-related operations.
 * @class
 */
export class PostControllerV1_1 {
    constructor() {
        this.service = new PostServiceV1_1();
    }

    /**
     * Retrieves all posts.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a post by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectById(req, res) {
        const { id } = req.params;
        const result = await this.service.selectById(id);
        return { code: result.code, values: result.values };
    }

    /**
     * Creates a new post.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {
        mongoSanitize.sanitize(req.body);
        const { body } = req;
        const data = {
            title: body.login,
            content: body.content,
            status: body.status,
            userId: body.userId
        };
        const result = await this.service.create(data);
        return { code: result.code, values: result.values };
    }

    /**
     * Set like on post.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async setLike(req, res) {
        mongoSanitize.sanitize(req.body);
        const { body } = req;
        const { id } = req.params;
        const data = {
            title: body.login,
            content: body.content,
            status: body.status,
            userId: body.userId
        };
    }

    /**
     * Updates an existing post.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async update(req, res) {
        mongoSanitize.sanitize(req.body);
        const { id } = req.params;
        const newData = req.body;
        const result = await this.service.update(id, newData);
        return { code: result.code, values: result.values };
    }

    /**
     * Deletes a post by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async delete(req, res) {
        const { id } = req.params;
        const result = await this.service.delete(id);
        return { code: result.code, values: result.values };
    }

    /**
     * Deletes like on post.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async deleteLike(req, res) {
        const { id } = req.params;

    }
}

const postControllerV1_1 = new PostControllerV1_1();

export default postControllerV1_1;
