import mongoSanitize from "express-mongo-sanitize";
import jwt from "jsonwebtoken";
import "dotenv/config";

import CommentServiceV1_1 from "./comment.service.v1.1.js";

/**
 * Controller class for comment-related operations.
 * @class
 */
export class CommentControllerV1_1 {
    constructor() {
        this.service = new CommentServiceV1_1();
    }

    /**
     * Retrieves all comments.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return { code: result.code, values: result.values };
    }

    /**
     * Retrieves a comment by its ID.
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
     * Creates a new comment.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {
        mongoSanitize.sanitize(req.body);
        const { body } = req;
        const data = {
            content: body.content,
            parentId: body.parentId,
            userId: body.userId,
            postId: body.postId
        };
        const result = await this.service.create(data);
        return { code: result.code, values: result.values };
    }

    /**
     * Updates an existing comment.
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
     * Deletes a comment by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async delete(req, res) {
        const { id } = req.params;
        const result = await this.service.delete(id);
        return { code: result.code, values: result.values };
    }
}

const commentControllerV1_1 = new CommentControllerV1_1();

export default commentControllerV1_1;
