import resolvers from "./graphQL/resolvers/resolver";
import typeDefs from "./graphQL/schemas/schema";
import { GraphQLServerVersion2 } from "./graphQL/server/impl/graphQLServerV2";
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import session from 'express-session';
import KeyCloakManager from "../managers/keycloak.manager";
import { FruitAPI } from "./graphQL/dataloader/FruitAPIDataLoader";
import { Context } from "./graphQL/context/Context";

const app = express();
const memoryStore = new session.MemoryStore();
const httpServer = http.createServer(app);

app.use(
    session({
      secret: "hello-kitty",
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
);

const keycloak = KeyCloakManager.getInstance().keycloak;
app.set("trust proxy", true);
app.use(keycloak.middleware());

// Initialize graphQL server and add middleware
const graphqlServer = new GraphQLServerVersion2(typeDefs, resolvers, httpServer);
graphqlServer.start().then(() => {
    app.use(
        '/graphql',
        keycloak.enforcer('resource:view'),
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(graphqlServer.getServer(),{  
            context: async (): Promise<Context> => {
                return {
                    fruitApi: new FruitAPI(),
                    clientId: keycloak.grantManager.clientId,
                }
            }
        }),
    );
});

// Start the server
const port = 4000;
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening:http://localhost:${port}`);
    /* eslint-enable no-console */
});

// TIP: No need to explicitly shutdown the server
// see: https://www.apollographql.com/docs/apollo-server/api/apollo-server#stoponterminationsignals
// process.on('SIGINT', () => {
//     console.log('Shutting down server');
//     graphqlServer.stop();
//     process.exit(0);
// });