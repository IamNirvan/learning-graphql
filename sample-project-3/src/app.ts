import resolvers from "./graphQL/resolvers/resolver.js";
import typeDefs from "./graphQL/schemas/schema.js";
import { IGraphQLServer } from "./graphQL/server/IGraphQLServer.js";
import { GraphQLServerVersion2 } from "./graphQL/server/impl/graphQLServerV2.js";
import { expressMiddleware } from '@apollo/server/express4';

import express from 'express';
import http from 'http';
import cors from 'cors';
// const server: IGraphQLServer = new GraphQLServerVersion1(4000, typeDefs, resolvers)
// server.start()


const app = express();
const httpServer = http.createServer(app);
const graphqlServer = new GraphQLServerVersion2(typeDefs, resolvers, httpServer);
await graphqlServer.start();

// setup the middleware
app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(graphqlServer.getServer(),{  
        context: graphqlServer.createContext
    }),
);

// Start the server
const port = 4000;
await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`server started at http://localhost:${port}/graphql`);
