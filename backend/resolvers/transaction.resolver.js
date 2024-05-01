import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

/**
 * Resolver for transaction-related queries and mutations.
 */
const transactionResolver = {
    // Query resolvers handle fetching data from the database
	Query: {
        /**
         * Get all transactions for the logged-in user.
         */
		transactions: async (_, __, context) => {
			try {
				// Check if the user is authenticated
				if (!context.getUser()) throw new Error("Unauthorized");
				
				// Retrieve the user ID from the context
				const userId = await context.getUser()._id;
				
				// Fetch transactions for the specified user
				const transactions = await Transaction.find({ userId });
				return transactions;
			} catch (err) {
				console.error("Error getting transactions:", err);
				throw new Error("Error getting transactions");
			}
		},
        /**
         * Get a specific transaction by ID.
         */
		transaction: async (_, { transactionId }) => {
			try {
				// Find the transaction by its ID
				const transaction = await Transaction.findById(transactionId);
				return transaction;
			} catch (err) {
				console.error("Error getting transaction:", err);
				throw new Error("Error getting transaction");
			}
		},
        /**
         * Get a summary of transaction amounts grouped by category for the logged-in user.
         */
		categoryStatistics: async (_, __, context) => {
			// Check if the user is authenticated
			if (!context.getUser()) throw new Error("Unauthorized");

			const userId = context.getUser()._id;
			// Fetch all transactions for the specified user
			const transactions = await Transaction.find({ userId });
			const categoryMap = {};

			// Group transactions by category and calculate the total amount for each category
			transactions.forEach((transaction) => {
				if (!categoryMap[transaction.category]) {
					categoryMap[transaction.category] = 0;
				}
				categoryMap[transaction.category] += transaction.amount;
			});

			// Return the summary as an array of category totals
			return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
		},
	},
    // Mutation resolvers handle creating, updating, and deleting data
	Mutation: {
        /**
         * Create a new transaction for the logged-in user.
         */
		createTransaction: async (_, { input }, context) => {
			try {
				// Create a new transaction using the input data and user ID
				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});
				
				// Save the new transaction to the database
				await newTransaction.save();
				return newTransaction;
			} catch (err) {
				console.error("Error creating transaction:", err);
				throw new Error("Error creating transaction");
			}
		},
        /**
         * Update an existing transaction by ID.
         */
		updateTransaction: async (_, { input }) => {
			try {
				// Update the transaction and return the updated object
				const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
					new: true,
				});
				return updatedTransaction;
			} catch (err) {
				console.error("Error updating transaction:", err);
				throw new Error("Error updating transaction");
			}
		},
        /**
         * Delete an existing transaction by ID.
         */
		deleteTransaction: async (_, { transactionId }) => {
			try {
				// Delete the transaction and return the deleted object
				const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
				return deletedTransaction;
			} catch (err) {
				console.error("Error deleting transaction:", err);
				throw new Error("Error deleting transaction");
			}
		},
	},
    // Additional resolver for handling related user data within a transaction
	Transaction: {
        /**
         * Resolve the user associated with a transaction.
         */
		user: async (parent) => {
			const userId = parent.userId;
			try {
				// Find the user by ID and return the user object
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error getting user:", err);
				throw new Error("Error getting user");
			}
		},
	},
};

export default transactionResolver;
