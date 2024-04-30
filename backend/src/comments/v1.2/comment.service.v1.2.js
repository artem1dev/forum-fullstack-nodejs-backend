import logger from "../../config/logger.js";
import Comment from "../comment.model.js";

/**
 * Service class for managing comment-related operations.
 */
export default class CommentServiceV1_2 {
    /**
     * Retrieves all comments
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {

    }

    /**
     * Retrieves a comment by id
     * @param {string} id - The comment's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {

    }

    /**
     * Creates a new comment
     * @param {Object} data - Data for creating the comment
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {

    }

    /**
     * Update a comment by id
     * @param {string} id - Id for updating the comment
     * @param {Object} newData - New data for updating the comment
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {

    }

    /**
     * Delete a comment by id
     * @param {string} id - The comment's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {

    }

    /**
     * Checks if a comment exists
     * @param {string} field - The field to search for the comment
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {

    }
}
