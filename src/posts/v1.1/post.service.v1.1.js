import logger from "../../config/logger.js";
import User from "../../users/user.model.js";
import Post from "../post.model.js";
import LikePost from "../likepost.model.js";
import Comment from "../../comments/comment.model.js";
import LikeComment from "../../comments/likecomment.model.js";
/**
 * Service class for managing post-related operations.
 */
export default class PostServiceV1_1 {
    /**
     * Retrieves all posts
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectAll() {
        try {
            const posts = await Post.find().lean();
            if (posts.length > 0) {
                for (const post of posts) {
                    const user = await User.findById(post.userId.toString());
                    const likes = await LikePost.find({ postId: post._id.toString() });
                    const comments = await Comment.find({ postId: post._id.toString() });
                    const counts = {
                        true: 0,
                        false: 0,
                    };
                    likes.forEach((item) => {
                        if (item.like == true) {
                            counts.true += 1;
                        } else {
                            counts.false += 1;
                        }
                    });
                    post.authorLogin = user.login;
                    post.profilePic = user.profilePic;
                    post.likeCount = counts.true;
                    post.dislikeCount = counts.false;
                    post.commentsCount = comments.length;
                }
                return { code: 200, values: posts };
            }
            return { code: 404, values: { status: "posts_not_found" } };
        } catch (error) {
            logger.error(`Error selecting posts: ${error}`);
            return { code: 500, values: `Error selecting posts: ${error}` };
        }
    }

    /**
     * Set like
     * @param {object} data - The input data
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async selectById(id) {
        try {
            const post = await Post.findById(id);
            if (post) {
                const user = await User.findById(post.userId);
                const likes = await LikePost.find({ postId: id });
                const counts = {
                    true: 0,
                    false: 0,
                };
                likes.forEach((item) => {
                    if (item.like == true) {
                        counts.true += 1;
                    } else {
                        counts.false += 1;
                    }
                });
                const comments = await Comment.find({ postId: id }).lean();
                for (const comment of comments) {
                    const userComment = await User.findById(comment.userId.toString());
                    const likesComment = await LikeComment.find({ commentId: comment._id });
                    const commentCounts = {
                        true: 0,
                        false: 0,
                    };
                    likesComment.forEach((item) => {
                        if (item.like == true) {
                            commentCounts.true += 1;
                        } else {
                            commentCounts.false += 1;
                        }
                    });
                    comment.login = userComment.login;
                    comment.likeCounts = commentCounts.true;
                    comment.dislikeCounts = commentCounts.false;
                }
                const data = {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    status: post.status,
                    userId: post.userId,
                    authorLogin: user.login,
                    profilePic: user.profilePic,
                    likeCount: counts.true,
                    dislikeCount: counts.false,
                    commentsCount: comments.length,
                    comments: comments,
                };
                return { code: 200, values: data };
            }
            return { code: 404, values: { status: "post_not_found" } };
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
            const posts = await Post.find({ userId: userId }).lean();
            if (posts.length > 0) {
                for (const post of posts) {
                    const user = await User.findById(post.userId);
                    const likes = await LikePost.find({ postId: post.id });
                    const comments = await Comment.find({ postId: post.id });
                    const counts = {
                        true: 0,
                        false: 0,
                    };
                    likes.forEach((item) => {
                        if (item.like == true) {
                            counts.true += 1;
                        } else {
                            counts.false += 1;
                        }
                    });
                    post.authorLogin = user.login;
                    post.profilePic = user.profilePic;
                    post.likeCount = counts.true;
                    post.dislikeCount = counts.false;
                    post.commentsCount = comments.length;
                }
                return { code: 200, values: posts };
            }
            return { code: 404, values: { status: "posts_not_found" } };
        } catch (error) {
            logger.error(`Error selecting posts: ${error}`);
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
                title: data.title,
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
     * Delete a post by id
     * @param {string} id - The post's id
     * @returns {Promise<{ code: number, values: any }>} Promise containing code and values
     */
    async setLike(data) {
        try {
            const post = await LikePost.findOne({
                postId: data.postId,
                userId: data.userId,
            });
            const isSelf = await Post.findById(data.postId);
            if (isSelf.userId == data.userId) {
                return { code: 400, values: "You cannot like self post!" };
            }
            if (post) {
                console.log(post.like)
                console.log(data.like)
                if (post.like == data.like) {
                    const result = await LikePost.findByIdAndDelete(post.id);
                    if (result) {
                        return { code: 200, values: "Like on post deleted successfully" };
                    }
                }
                const newLikePost = await LikePost.findByIdAndUpdate(
                    post.id,
                    { $set: { like: post.like ? false : true } },
                    { new: true },
                );
                if (newLikePost) {
                    return { code: 200, values: "Like on post updated" };
                }
            } else {
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
            const post = await Post.findByIdAndUpdate(id, { $set: newData }, { new: true });
            if (post) {
                return { code: 200, values: "Post updated" };
            }
            return { code: 404, values: { status: "post_not_found" } };
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
            const whereClause = {};
            whereClause[field] = value;
            const post = await Post.findOne(whereClause);
            if (post) {
                return post;
            }
        } catch (error) {
            logger.error(`Error fetching post by ${field}: ${error}`);
            return { code: 500, values: `Error fetching post by ${field}` };
        }
    }
}
