import resolvers from "./graphQL/resolvers/resolver";
import typeDefs from "./graphQL/schemas/schema";
import { GraphQLServerVersion2 } from "./graphQL/server/impl/graphQLServerV2";
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import session from 'express-session';
import KeyCloakManager from "../managers/keycloak.manager";

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

// Initialize graphQL server
const graphqlServer = new GraphQLServerVersion2(typeDefs, resolvers, httpServer);
graphqlServer.start().then(() => {
    app.use(
        '/graphql',
        keycloak.enforcer('resource:view'),
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(graphqlServer.getServer(),{  
            context: graphqlServer.createContext
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
