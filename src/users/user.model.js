import mongoose from "mongoose";

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true, // Ensures logins are unique across all users
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true,
        default: "default.png"
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    }
});

// Create a User model
const User = mongoose.model("User", userSchema);

export default User;
