import { ServerV1 } from "./server/server.js";
import typeDefs from './server/graphql/schema.js';
import resolver from './server/graphql/resolvers.js';
const server = new ServerV1(2000, typeDefs, resolver);
server.start();
