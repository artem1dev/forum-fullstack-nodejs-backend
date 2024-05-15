import mongoose from "mongoose";

import logger from "../../logger/logger.js";
import User from "../../users/user.model.js";
import Post from "../post.model.js";
import LikePost from "../likepost.model.js";
import Comment from "../../comments/comment.model.js";
import LikeComment from "../../comments/likecomment.model.js";

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
            const posts = await Post.aggregate([
                { $match: {} }, // Assuming you want all posts, adjust as necessary
                {
                    $lookup: {
                        from: User.collection.name,
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                {
                    $lookup: {
                        from: LikePost.collection.name,
                        localField: "_id",
                        foreignField: "postId",
                        as: "likes",
                    },
                },
                {
                    $lookup: {
                        from: Comment.collection.name,
                        localField: "_id",
                        foreignField: "postId",
                        as: "comments",
                    },
                },
                {
                    $addFields: {
                        likeCount: {
                            $size: {
                                $filter: {
                                    input: "$likes",
                                    as: "like",
                                    cond: { $eq: ["$$like.like", true] },
                                },
                            },
                        },
                        dislikeCount: {
                            $size: {
                                $filter: {
                                    input: "$likes",
                                    as: "like",
                                    cond: { $eq: ["$$like.like", false] },
                                },
                            },
                        },
                        commentsCount: { $size: "$comments" },
                        authorLogin: "$user.login",
                        profilePic: "$user.profilePic",
                    },
                },
                {
                    $project: {
                        user: 0,
                        likes: 0,
                        comments: 0,
                    },
                },
            ]).exec();
            posts.forEach((post) => {
                post.comments = buildTree(post.comments);
            });
            function buildTree(comments, parentId = null) {
                try {
                    return comments
                        .filter((comment) => (comment.parentId ? comment.parentId.toString() : null) === parentId)
                        .map((comment) => ({
                            ...comment,
                            replies: buildTree(comments, comment._id.toString()),
                        }));
                } catch (error) {
                    logger.error("Error building comment tree:", error);
                    return [];
                }
            }
            if (posts.length > 0) {
                return { code: 200, values: posts };
            } else {
                return { code: 404, values: { status: "posts_not_found" } };
            }
        } catch (error) {
            logger.error(`Error selecting posts: ${error}`);
            return { code: 500, values: `Error selecting posts: ${error}` };
        }
    }

    /**
     * Retrieves a post by id
     * @param {string} postId - The post's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(postId) {
        try {
            const results = await Post.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(postId) } },
                {
                    $lookup: {
                        from: User.collection.name,
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                {
                    $lookup: {
                        from: LikePost.collection.name,
                        localField: "_id",
                        foreignField: "postId",
                        as: "likes",
                    },
                },
                {
                    $addFields: {
                        likeCount: {
                            $size: { $filter: { input: "$likes", as: "item", cond: { $eq: ["$$item.like", true] } } },
                        },
                        dislikeCount: {
                            $size: { $filter: { input: "$likes", as: "item", cond: { $eq: ["$$item.like", false] } } },
                        },
                    },
                },
                {
                    $lookup: {
                        from: Comment.collection.name,
                        localField: "_id",
                        foreignField: "postId",
                        as: "comments",
                    },
                },
                { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: LikeComment.collection.name,
                        localField: "comments._id",
                        foreignField: "commentId",
                        as: "comments.likes",
                    },
                },
                {
                    $addFields: {
                        "comments.likeCount": {
                            $size: {
                                $filter: { input: "$comments.likes", as: "item", cond: { $eq: ["$$item.like", true] } },
                            },
                        },
                        "comments.dislikeCount": {
                            $size: {
                                $filter: { input: "$comments.likes", as: "item", cond: { $eq: ["$$item.like", false] } },
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        root: { $mergeObjects: "$$ROOT" },
                        comments: { $push: "$comments" },
                    },
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: ["$root", "$$ROOT"],
                        },
                    },
                },
                {
                    $project: {
                        root: 0,
                        "comments.likes": 0,
                    },
                },
            ]).exec();
            
            if (results.length === 0) {
                return { code: 404, values: { status: "post_not_found" } };
            }

            const data = { ...results[0], commentsCount: results[0].comments.length };

            return { code: 200, values: data };
        } catch (error) {
            logger.error(`Error selecting post: ${error}`);
            return { code: 500, values: `Error selecting post: ${error}` };
        }
    }

    /**
     * Retrieves all posts by userId
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectByUserId(userId) {
        try {
            const results = await Post.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(userId) } },
                {
                    $lookup: {
                        from: "users", // Assuming the collection name for User model is "users"
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                {
                    $lookup: {
                        from: "likeposts", // Assuming the collection name for LikePost model is "likeposts"
                        localField: "_id",
                        foreignField: "postId",
                        as: "likes",
                    },
                },
                {
                    $lookup: {
                        from: "comments", // Assuming the collection name for Comment model is "comments"
                        localField: "_id",
                        foreignField: "postId",
                        as: "comments",
                    },
                },
                {
                    $addFields: {
                        likeCount: {
                            $size: {
                                $filter: {
                                    input: "$likes",
                                    as: "like",
                                    cond: { $eq: ["$$like.like", true] },
                                },
                            },
                        },
                        dislikeCount: {
                            $size: {
                                $filter: {
                                    input: "$likes",
                                    as: "like",
                                    cond: { $eq: ["$$like.like", false] },
                                },
                            },
                        },
                        commentsCount: { $size: "$comments" },
                        authorLogin: "$user.login",
                        profilePic: "$user.profilePic",
                    },
                },
                {
                    $project: {
                        likes: 0,
                        user: 0,
                        comments: 0,
                    },
                },
            ]).exec();

            if (results.length > 0) {
                return { code: 200, values: results };
            } else {
                return { code: 404, values: { status: "posts_not_found" } };
            }
        } catch (error) {
            logger.error(`Error selecting posts by userId: ${error}`);
            return { code: 500, values: `Error selecting posts: ${error}` };
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
                userId: data.userId,
            });
            await newPost.save();
            return { code: 200, values: "Post created" };
        } catch (error) {
            logger.error(`Error creating post: ${error}`);
            return { code: 500, values: `Error creating post: ${error}` };
        }
    }

    /**
     * Set like
     * @param {object} data - The input data
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async setLike(data) {
        try {
            // Find the like on the post by this user
            const match = await LikePost.aggregate([
                {
                    $match: {
                        postId: new mongoose.Types.ObjectId(data.postId),
                        userId: new mongoose.Types.ObjectId(data.userId),
                    },
                },
            ]).exec();

            const postLike = match[0];

            if (postLike) {
                if (postLike.like === data.like) {
                    // User is toggling the like off
                    const result = await LikePost.findByIdAndDelete(postLike._id);
                    if (result) {
                        return { code: 200, values: "Like on post deleted successfully" };
                    }
                } else {
                    // Toggle the like state
                    const updatedLikePost = await LikePost.findByIdAndUpdate(
                        postLike._id,
                        { $set: { like: !postLike.like } },
                        { new: true },
                    );
                    if (updatedLikePost) {
                        return { code: 200, values: "Like on post updated" };
                    }
                }
            } else {
                // Create a new like if none existed
                const newLikePost = new LikePost({
                    like: data.like,
                    userId: data.userId,
                    postId: data.postId,
                });
                await newLikePost.save();
                return { code: 200, values: "Like on post created" };
            }
        } catch (error) {
            logger.error(`Error setting like: ${error}`);
            return { code: 500, values: `Error setting like: ${error}` };
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
            const result = await Post.updateOne({ _id: id }, [{ $set: newData }], { new: true });
            if (result.nModified > 0) {
                return { code: 200, values: "Post updated" };
            } else if (result.n === 0) {
                return { code: 404, values: { status: "post_not_found" } };
            } else {
                return { code: 200, values: "No changes made" };
            }
        } catch (error) {
            logger.error(`Error updating post: ${error}`);
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
            logger.error(`Error deleting post: ${error}`);
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
            const pipeline = [{ $match: matchStage }];
            const result = await Post.aggregate(pipeline).exec();

            if (result.length > 0) {
                return result[0];
            } else {
                return { code: 404, values: "No post found" };
            }
        } catch (error) {
            logger.error(`Error fetching post by ${field}: ${error}`);
            return { code: 500, values: `Error fetching post by ${field}: ${error}` };
        }
    }
}
