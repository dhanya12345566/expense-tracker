import mongoose from "mongoose";

/**
 * Define the schema for a user in the database.
 */
const userSchema = new mongoose.Schema(
    {
        // Unique username for the user
		username: {
			type: String,
			required: true,
			unique: true,
		},
        // Full name of the user
		name: {
			type: String,
			required: true,
		},
        // Encrypted password for the user
		password: {
			type: String,
			required: true,
		},
        // Profile picture URL of the user
		profilePicture: {
			type: String,
			default: "",
		},
        // Gender of the user (either male or female)
		gender: {
			type: String,
			enum: ["male", "female"],
		},
	},
    // Automatically add `createdAt` and `updatedAt` fields
	{ timestamps: true }
);

/**
 * Create a model for the user schema.
 * This model is used to interact with the database.
 */
const User = mongoose.model("User", userSchema);

export default User;
