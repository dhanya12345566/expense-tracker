const transactionTypeDef = `#graphql
  # Definition of a Transaction type, which represents a transaction record.
  # It contains various fields such as:
  # - _id: Unique identifier for the transaction.
  # - userId: Reference to the user who made the transaction.
  # - description: Description of the transaction.
  # - paymentType: Type of payment (e.g., cash, card).
  # - category: Category of the transaction (e.g., expense, saving, investment).
  # - amount: Amount involved in the transaction.
  # - location: Location of the transaction, if applicable.
  # - date: Date of the transaction.
  # - user: Reference to the associated User type.
  type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
    user: User!
  }

  # Definition of the Query type, which contains queries that can be performed.
  # - transactions: Returns an array of all transactions for the current user.
  # - transaction: Returns a specific transaction based on the provided transaction ID.
  # - categoryStatistics: Returns statistics for each category of transactions.
  type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
    categoryStatistics: [CategoryStatistics!]
  }

  # Definition of the Mutation type, which contains mutations that can be performed.
  # - createTransaction: Creates a new transaction with the provided input data.
  # - updateTransaction: Updates an existing transaction with the provided input data.
  # - deleteTransaction: Deletes a transaction based on the provided transaction ID.
  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): Transaction!
  }

  # Definition of the CategoryStatistics type, which represents statistics for each category.
  # It includes the following fields:
  # - category: The category of transactions (e.g., expense, saving, investment).
  # - totalAmount: The total amount for the category.
  type CategoryStatistics {
    category: String!
    totalAmount: Float!
  }

  # Input type for creating a new transaction.
  # - description: Description of the transaction.
  # - paymentType: Type of payment (e.g., cash, card).
  # - category: Category of the transaction (e.g., expense, saving, investment).
  # - amount: Amount involved in the transaction.
  # - date: Date of the transaction.
  # - location: Location of the transaction, if applicable.
  input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }

  # Input type for updating an existing transaction.
  # - transactionId: ID of the transaction to be updated.
  # - description: New description for the transaction.
  # - paymentType: New payment type for the transaction.
  # - category: New category for the transaction.
  # - amount: New amount for the transaction.
  # - location: New location for the transaction, if applicable.
  # - date: New date for the transaction.
  input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
  }
`;

export default transactionTypeDef;
