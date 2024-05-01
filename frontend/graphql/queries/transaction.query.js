import { gql } from "@apollo/client";

// GET_TRANSACTIONS query:
// - Retrieves a list of all transactions for the current user.
// - Returns the transaction ID, description, payment type, category, amount, location, and date for each transaction.
export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions {
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`;

// GET_TRANSACTION query:
// - Retrieves details of a specific transaction based on its ID.
// - Takes the transaction ID as an input parameter.
// - Returns the transaction ID, description, payment type, category, amount, location, and date.
// - Also returns the user information associated with the transaction, including name, username, and profile picture.
export const GET_TRANSACTION = gql`
    query GetTransaction($id: ID!) {
        transaction(transactionId: $id) {
            _id
            description
            paymentType
            category
            amount
            location
            date
            user {
                name
                username
                profilePicture
            }
        }
    }
`;

// GET_TRANSACTION_STATISTICS query:
// - Retrieves statistics about transactions grouped by category for the current user.
// - Returns the category name and the total amount of transactions in each category.
export const GET_TRANSACTION_STATISTICS = gql`
    query GetTransactionStatistics {
        categoryStatistics {
            category
            totalAmount
        }
    }
`;
