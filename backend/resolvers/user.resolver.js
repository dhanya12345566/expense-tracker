import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

/**
 * Resolver for user-related queries and mutations.
 */
const userResolver = {
	// Mutation resolvers handle creating, updating, and deleting data
	Mutation: {
        /**
         * Sign up a new user.
         */
		signUp: async (_, { input }, context) => {
			try {
				// Destructure input fields
				const { username, name, password, gender } = input;

				// Ensure all required fields are provided
				if (!username || !name || !password || !gender) {
					throw new Error("All fields are required");
				}
				// Check if the user already exists
				const existingUser = await User.findOne({ username });
				if (existingUser) {
					throw new Error("User already exists");
				}

				// Generate salt and hash the password for security
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				// Generate profile picture URLs based on gender
				const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

				// Create a new user document
				const newUser = new User({
					username,
					name,
					password: hashedPassword,
					gender,
					profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
				});

				// Save the new user to the database and log in the user
				await newUser.save();
				await context.login(newUser);
				return newUser;
			} catch (err) {
				console.error("Error in signUp: ", err);
				throw new Error(err.message || "Internal server error");
			}
		},

        /**
         * Log in an existing user.
         */
		login: async (_, { input }, context) => {
			try {
				// Destructure input fields
				const { username, password } = input;
				
				// Ensure both username and password are provided
				if (!username || !password) throw new Error("All fields are required");

				// Authenticate the user using the provided username and password
				const { user } = await context.authenticate("graphql-local", { username, password });

				// Log in the user and return the user object
				await context.login(user);
				return user;
			} catch (err) {
				console.error("Error in login:", err);
				throw new Error(err.message || "Internal server error");
			}
		},
        /**
         * Log out the current user.
         */
		logout: async (_, __, context) => {
			try {
				// Log out the user from the session
				await context.logout();

				// Destroy the session and clear the session cookie
				context.req.session.destroy((err) => {
					if (err) throw err;
				});
				context.res.clearCookie("connect.sid");

				// Return a success message
				return { message: "Logged out successfully" };
			} catch (err) {
				console.error("Error in logout:", err);
				throw new Error(err.message || "Internal server error");
			}
		},
	},
	// Query resolvers handle fetching data from the database
	Query: {
        /**
         * Get the authenticated user.
         */
		authUser: async (_, __, context) => {
			try {
				// Retrieve the current user from the context
				const user = await context.getUser();
				return user;
			} catch (err) {
				console.error("Error in authUser: ", err);
				throw new Error("Internal server error");
			}
		},
        /**
         * Get a specific user by ID.
         */
		user: async (_, { userId }) => {
			try {
				// Find the user by ID
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error in user query:", err);
				throw new Error(err.message || "Error getting user");
			}
		},
	},
	// Resolver for user-related data in the User model
	User: {
        /**
         * Get transactions associated with a user.
         */
		transactions: async (parent) => {
			try {
				// Find all transactions associated with the user's ID
				const transactions = await Transaction.find({ userId: parent._id });
				return transactions;
			} catch (err) {
				console.log("Error in user.transactions resolver: ", err);
				throw new Error(err.message || "Internal server error");
			}
		},
	},
};

export default userResolver;
