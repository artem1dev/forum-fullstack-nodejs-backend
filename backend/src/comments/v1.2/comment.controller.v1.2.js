import CommentServiceV1_2 from "./comment.service.v1.2.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Controller class for comment-related operations.
 * @class
 */
export class CommentControllerV1_2 {
    constructor() {
        this.service = new CommentServiceV1_2();
    }

    /**
     * Retrieves all comments.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectAll(req, res) {

    }

    /**
     * Retrieves a comment by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async selectById(req, res) {

    }

    /**
     * Creates a new comment.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async create(req, res) {

    }

    /**
     * Updates an existing comment.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async update(req, res) {

    }

    /**
     * Deletes a comment by its ID.
     * @param {import("express").Request} req The Express request object.
     * @param {import("express").Response} res The Express response object.
     * @returns {Promise<{code: number, values: any}>} The result of the operation.
     */
    async delete(req, res) {

    }
}

const commentControllerV1_2 = new CommentControllerV1_2();

export default commentControllerV1_2;
