import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";

// Combine multiple resolver files into one object
const mergedResolvers = mergeResolvers([userResolver, transactionResolver]);

// Export the merged resolvers to be used in the GraphQL server setup
export default mergedResolvers;
