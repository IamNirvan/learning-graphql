import resolvers from "./graphQL/resolvers/resolver.js";
import typeDefs from "./graphQL/schemas/schema.js";
import { IGraphQLServer } from "./graphQL/server/IGraphQLServer.js";
import { GraphQLServerVersion1 } from "./graphQL/server/impl/graphQlServerV1.js";

const server: IGraphQLServer = new GraphQLServerVersion1(4000, typeDefs, resolvers)
server.start()