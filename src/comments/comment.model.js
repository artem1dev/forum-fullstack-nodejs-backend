// Import Mongoose
import mongoose from "mongoose";

const { Schema } = mongoose;

// Create a Schema for Comments
const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
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
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
