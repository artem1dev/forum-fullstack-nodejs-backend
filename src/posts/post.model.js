// Import Mongoose
import mongoose from "mongoose";

const { Schema } = mongoose;

// Create a Schema for Posts
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["active", "inactive"],
            default: "active",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt fields
    },
);

// Create a Post model
const Post = mongoose.model("Post", postSchema);

export default Post;
