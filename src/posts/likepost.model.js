// Import Mongoose
import mongoose from "mongoose";

const { Schema } = mongoose;

// Create a Schema for Comments
const likePostSchema = new Schema(
    {
        like: {
            type: Boolean,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt fields
    },
);

// Create a Comment model
const LikePost = mongoose.model("LikePost", likePostSchema);

export default LikePost;
