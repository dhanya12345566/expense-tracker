import { gql } from "@apollo/client";

// This file contains GraphQL mutation queries for creating, updating, and deleting transactions.

// GraphQL mutation for creating a new transaction
export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($input: CreateTransactionInput!) {
        createTransaction(input: $input) {
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

// GraphQL mutation for updating an existing transaction
export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($input: UpdateTransactionInput!) {
        updateTransaction(input: $input) {
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

// GraphQL mutation for deleting a transaction
export const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($transactionId: ID!) {
        deleteTransaction(transactionId: $transactionId) {
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
