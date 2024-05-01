import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

/**
 * Function to configure Passport for authentication.
 */
export const configurePassport = async () => {
	// Serialize the user ID to the session
	passport.serializeUser((user, done) => {
		console.log("Serializing user");
		done(null, user.id);
	});

	// Deserialize the user ID from the session
	passport.deserializeUser(async (id, done) => {
		console.log("Deserializing user");
		try {
			// Find the user in the database by ID
			const user = await User.findById(id);
			// Pass the user object to the next step
			done(null, user);
		} catch (err) {
			// Pass any errors to the error handler
			done(err);
		}
	});

	// Use GraphQLLocalStrategy for local authentication
	passport.use(
		new GraphQLLocalStrategy(async (username, password, done) => {
			try {
				// Find the user by username in the database
				const user = await User.findOne({ username });
				if (!user) {
					// If the user is not found, return an error
					throw new Error("Invalid username or password");
				}
				
				// Compare the provided password with the stored hashed password
				const validPassword = await bcrypt.compare(password, user.password);
				
				if (!validPassword) {
					// If the passwords do not match, return an error
					throw new Error("Invalid username or password");
				}

				// If authentication is successful, return the user
				return done(null, user);
			} catch (err) {
				// Return any errors encountered during authentication
				return done(err);
			}
		})
	);
};
