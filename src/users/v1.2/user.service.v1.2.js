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
        try {
            const users = await User.aggregate([
                { $project: { password: 0, __v: 0 } }
            ]);
    
            if (users.length > 0) {
                return { code: 200, values: users };
            } else {
                return { code: 404, values: { status: "users_not_found" } };
            }
        } catch (error) {
            console.error(`Error selecting users: ${error}`);
            return { code: 500, values: `Error selecting users: ${error}` };
        }
    }

    /**
     * Retrieves a user by id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            // Using aggregation to find user and exclude password
            const results = await User.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(id) } }, // Ensure that you match by ObjectID
                { $project: { password: 0, __v: 0 } } // Exclude password and version key (__v)
            ]).exec();
    
            const user = results[0]; // Aggregation returns an array, even if only one document matches
    
            if (user) {
                return { code: 200, values: user };
            } else {
                return { code: 404, values: { status: "user_not_found" } };
            }
        } catch (error) {
            console.error(`Error selecting user: ${error}`);
            return { code: 500, values: `Error selecting user: ${error}` };
        }
    }

    /**
     * Retrieves a user by login
     * @param {string} id - The user's login
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectByLogin(login) {
        try {
            const results = await User.aggregate([
                { $match: { login: login } },
                { $project: { password: 0, __v: 0 } }
            ]);
            const user = results[0];
            if (user) {
                return { code: 200, values: user };
            } else {
                return { code: 404, values: { status: "user_not_found" } };
            }
        } catch (error) {
            console.error(`Error fetching user by login: ${error}`);
            return { code: 500, values: `Error fetching user by login: ${error}` };
        }
    }

    /**
     * Creates a new user
     * @param {Object} data - Data for creating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newUser = new User({
                login: data.login,
                password: data.password,
                role: data.role,
            });
            await newUser.save();
            return { code: 200, values: "User created" };
        } catch (error) {
            logger.error(`Error creating user: ${error}`);
            return { code: 500, values: `Error creating user: ${error}` };
        }
    }

    /**
     * Update a user by id
     * @param {string} id - Id for updating the user
     * @param {Object} newData - New data for updating the user
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {
        try {
            const result = await User.updateOne({ _id: id }, [{ $set: newData }], { new: true });
            if (result.nModified > 0) {
                return { code: 200, values: "User updated" };
            } else if (result.n === 0) {
                return { code: 404, values: { status: "user_not_found" } };
            } else {
                return { code: 200, values: "No changes made" };
            }
        } catch (error) {
            logger.error(`Error updating user: ${error}`);
            return { code: 500, values: "Error updating user" };
        }
    }

    /**
     * Delete a user by id
     * @param {string} id - The user's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {
        try {
            const result = await User.findByIdAndDelete(id);
            if (result) {
                return { code: 200, values: "User deleted successfully" };
            }
            return { code: 404, values: { status: "users_not_found" } };
        } catch (error) {
            logger.error(`Error deleting user: ${error}`);
            return { code: 500, values: `Error deleting user: ${error}` };
        }
    }

    /**
     * Checks if a user exists
     * @param {string} field - The field to search for the user
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const matchStage = {};
            matchStage[field] = value;
            const pipeline = [{ $match: matchStage }];
            const result = await User.aggregate(pipeline);

            if (result.length > 0) {
                return result[0];
            } else {
                return { code: 404, values: "No user found" };
            }
        } catch (error) {
            logger.error(`Error fetching user by ${field}: ${error}`);
            return { code: 500, values: `Error fetching user by ${field}: ${error}` };
        }
    }
}
