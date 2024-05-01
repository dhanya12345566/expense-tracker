import { mergeTypeDefs } from "@graphql-tools/merge";


// Importing type definitions for different schemas
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

// Merge the imported type definitions into one combined type definition object
const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

// Export the merged type definitions for use in the GraphQL server setup
export default mergedTypeDefs;
