// Import Mongoose
import mongoose from "mongoose";

const { Schema } = mongoose;

// Create a Schema for Comments
const likeCommentSchema = new Schema(
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
        commentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt fields
    },
);

// Create a Comment model
const LikeComment = mongoose.model("LikeComment", likeCommentSchema);

export default LikeComment;
