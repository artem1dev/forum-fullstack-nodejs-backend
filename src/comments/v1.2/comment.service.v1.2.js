import logger from "../../config/logger.js";
import Comment from "../comment.model.js";
import LikeComment from "../likecomment.model.js";

/**
 * Service class for managing comment-related operations.
 */
export default class CommentServiceV1_2 {
    /**
     * Retrieves all comments
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const comments = await Comment.aggregate([]);
            if (comments.length > 0) {
                return { code: 200, values: comments };
            } else {
                return { code: 404, values: { status: "comments_not_found" } };
            }
        } catch (error) {
            logger.error(`Error selecting comments: ${error}`);
            return { code: 500, values: `Error selecting comments: ${error}` };
        }
    }

    /**
     * Retrieves a comment by id
     * @param {string} id - The comment's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const result = await Comment.aggregate([
              { $match: { _id: mongoose.Types.ObjectId(id) } },
            ]);
        
            if (result.length > 0) {
              return { code: 200, values: result[0] };
            } else {
              return { code: 404, values: { status: "comment_not_found" } };
            }
        } catch (error) {
            logger.error(`Error selecting comment: ${error}`);
            return { code: 500, values: `Error selecting comment: ${error}` };
        }
    }

    /**
     * Creates a new comment
     * @param {Object} data - Data for creating the comment
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async create(data) {
        try {
            const newComment = new Comment({
                content: data.content,
                parentId: data.parentId,
                userId: data.userId,
                postId: data.postId
            });
            await newComment.save();
            return { code: 200, values: "Comment created" };
        } catch (error) {
            logger.error(`Error creating comment: ${error}`);
            return { code: 500, values: `Error creating comment: ${error}` };
        }
    }

    /**
     * Delete a post by id
     * @param {string} id - The post's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async setLike(data) {
        try {
            const comment = await LikeComment.findOne({
                where: {
                    commentId: data.commentId,
                    userId: data.userId
                },
            });
            if (comment) {
                if(comment.like == data.like) {
                    const result = await LikeComment.findByIdAndDelete(comment.id);
                    if (result) {
                        return { code: 200, values: "Like on comment deleted successfully" };
                    }
                }
                const newLikeComment = await LikeComment.findByIdAndUpdate(comment.id, { $set: { like: comment.like ? false : true } }, { new: true });
                if (newLikeComment) {
                    return { code: 200, values: "Like on comment updated" };
                }
            } else {
                const newLikeComment = new LikeComment({
                    like: data.like,
                    userId: data.userId,
                    commentId: data.commentId
                });
                await newLikeComment.save();
                return { code: 200, values: "Like on comment created" };
            }
        } catch (error) {
            logger.error(`Error setting like: ${error}`);
            return { code: 500, values: `Error setting like: ${error}` };
        }
    }

    /**
     * Update a comment by id
     * @param {string} id - Id for updating the comment
     * @param {Object} newData - New data for updating the comment
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async update(id, newData) {
        try {
            const comment = await Comment.findByIdAndUpdate(id, { $set: newData }, { new: true });
            if (comment) {
                return { code: 200, values: "Comment updated" };
            }
            return { code: 404, values: { status: "comment_not_found" } };
        } catch (error) {
            logger.error(`Error updating comment: ${error}`);
            return { code: 500, values: "Error updating comment" };
        }
    }

    /**
     * Delete a comment by id
     * @param {string} id - The comment's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async delete(id) {
        try {
            const result = await Comment.findByIdAndDelete(id);
            if (result) {
                return { code: 200, values: "Comment deleted successfully" };
            }
            return { code: 404, values: { status: "comments_not_found" } };
        } catch (error) {
            logger.error(`Error deleting comments: ${error}`);
            return { code: 500, values: `Error deleting comments: ${error}` };
        }
    }

    /**
     * Checks if a comment exists
     * @param {string} field - The field to search for the comment
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
            const result = await Comment.aggregate(pipeline);

            if (result.length > 0) {
                return result[0];
            } else {
                return { code: 404, values: "No comment found" };
            }
        } catch (error) {
            logger.error(`Error fetching comment by ${field}: ${error}`);
            return { code: 500, values: `Error fetching comment by ${field}: ${error}` };
        }
    }
}
