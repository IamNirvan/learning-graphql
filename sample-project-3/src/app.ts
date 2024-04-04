import resolvers from "./graphQL/resolvers/resolver.js";
import typeDefs from "./graphQL/schemas/schema.js";
import { GraphQLServerVersion2 } from "./graphQL/server/impl/graphQLServerV2.js";
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';

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


// const api = new FruitAPI();
// api.getFruitInfo("apple").then(res => console.log(res));