import logger from "../../config/logger.js";
import User from "../user.model.js";

/**
 * Service class for managing user-related operations.
 */
export default class UserServiceV1_2 {
    /**
     * Retrieves all users
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {

    }

    /**
     * Retrieves a user by id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {

    }

    /**
     * Creates a new user
     * @param {Object} data - Data for creating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {

    }

    /**
     * Update a user by id
     * @param {string} id - Id for updating the user
     * @param {Object} newData - New data for updating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {

    }

    /**
     * Delete a user by id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {

    }

    /**
     * Checks if a user exists
     * @param {string} field - The field to search for the user
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {

    }
}
