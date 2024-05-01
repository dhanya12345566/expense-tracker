import mongoose from "mongoose";

/**
 * Function to establish a connection to the MongoDB database.
 */
export const connectDB = async () => {
	try {
		// Attempt to connect to MongoDB using the connection string provided in the environment variable
		const conn = await mongoose.connect(process.env.MONGO_URI);
		
		// Log a success message with the host name if the connection is established
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		// Log an error message if there is an issue with the connection
		console.error(`Error: ${err.message}`);
		
		// Exit the process with a status code of 1 to indicate a failure
		process.exit(1);
	}
};
