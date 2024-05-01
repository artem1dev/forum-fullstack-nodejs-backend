import logger from "../../config/logger.js";
import Post from "../post.model.js";

/**
 * Service class for managing post-related operations.
 */
export default class PostServiceV1_2 {
    /**
     * Retrieves all posts
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const posts = await Post.aggregate([]);
            if (posts.length > 0) {
                return { code: 200, values: posts };
            } else {
                return { code: 404, values: { status: "posts_not_found" } };
            }
        } catch (error) {
            logger.error(`Error selecting posts: ${error.message}`);
            return { code: 500, values: `Error selecting posts: ${error}` };
        }
    }

    /**
     * Retrieves a post by id
     * @param {string} id - The post's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const result = await Post.aggregate([
              { $match: { _id: mongoose.Types.ObjectId(id) } },
            ]);
        
            if (result.length > 0) {
              return { code: 200, values: result[0] };
            } else {
              return { code: 404, values: { status: "post_not_found" } };
            }
        } catch (error) {
            logger.error(`Error selecting post: ${error.message}`);
            return { code: 500, values: `Error selecting post: ${error}` };
        }
    }

    /**
     * Creates a new post
     * @param {Object} data - Data for creating the post
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newPost = new Post({
                title: data.login,
                content: data.content,
                status: data.status,
                userId: data.userId
            });
            await newPost.save();
            return { code: 200, values: "Post created" };
        } catch (error) {
            logger.error(`Error creating post: ${error.message}`);
            return { code: 500, values: `Error creating post: ${error}` };
        }
    }

    /**
     * Update a post by id
     * @param {string} id - Id for updating the post
     * @param {Object} newData - New data for updating the post
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {
        try {
            const result = await Post.updateOne(
                { _id: id },
                [
                    { $set: newData }
                ],
                { new: true }
            );
            if (result.nModified > 0) {
                return { code: 200, values: "Post updated" };
            } else if (result.n === 0) {
                return { code: 404, values: { status: "post_not_found" } };
            } else {
                return { code: 200, values: "No changes made" };
            }
        } catch (error) {
            logger.error(`Error updating post: ${error.message}`);
            return { code: 500, values: "Error updating post" };
        }
    }

    /**
     * Delete a post by id
     * @param {string} id - The post's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {
        try {
            const result = await Post.findByIdAndDelete(id);
            if (result) {
                return { code: 200, values: "Post deleted successfully" };
            }
            return { code: 404, values: { status: "posts_not_found" } };
        } catch (error) {
            logger.error(`Error deleting post: ${error.message}`);
            return { code: 500, values: `Error deleting post: ${error}` };
        }
    }

    /**
     * Checks if a post exists
     * @param {string} field - The field to search for the post
     * @param {string} value - The value of the field to search for
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async isExist(field, value) {
        try {
            const matchStage = {};
            matchStage[field] = value;
            const pipeline = [
                { $match: matchStage }
            ];
            const result = await Post.aggregate(pipeline);

            if (result.length > 0) {
                return result[0];
            } else {
                return { code: 404, values: "No post found" };
            }
        } catch (error) {
            logger.error(`Error fetching post by ${field}: ${error.message}`);
            return { code: 500, values: `Error fetching post by ${field}: ${error}` };
        }
    }
}