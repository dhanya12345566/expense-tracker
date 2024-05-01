import mongoose from "mongoose";

/**
 * Define the schema for a transaction in the database.
 */
const transactionSchema = new mongoose.Schema({
    // Reference to the user who made the transaction
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
    // Description of the transaction
	description: {
		type: String,
		required: true,
	},
    // Payment type, either cash or card
	paymentType: {
		type: String,
		enum: ["cash", "card"],
		required: true,
	},
    // Category of the transaction (saving, expense, or investment)
	category: {
		type: String,
		enum: ["saving", "expense", "investment"],
		required: true,
	},
    // Amount involved in the transaction
	amount: {
		type: Number,
		required: true,
	},
    // Location of the transaction, with a default value of "Unknown"
	location: {
		type: String,
		default: "Unknown",
	},
    // Date of the transaction
	date: {
		type: Date,
		required: true,
	},
});

/**
 * Create a model for the transaction schema.
 * This model is used to interact with the database.
 */
const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
