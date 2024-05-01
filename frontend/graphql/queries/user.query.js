import { gql } from "@apollo/client";

// GET_AUTHENTICATED_USER query:
// - Retrieves information about the currently authenticated user.
// - Returns the user's ID, username, name, and profile picture.
export const GET_AUTHENTICATED_USER = gql`
    query GetAuthenticatedUser {
        authUser {
            _id
            username
            name
            profilePicture
        }
    }
`;

// GET_USER_AND_TRANSACTIONS query:
// - Retrieves information about a specific user by user ID.
// - Returns the user's ID, name, username, profile picture, and related transactions.
export const GET_USER_AND_TRANSACTIONS = gql`
    query GetUserAndTransactions($userId: ID!) {
        user(userId: $userId) {
            _id
            name
            username
            profilePicture
            # relationships
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
    }
`;
