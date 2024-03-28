import { ApolloServer } from "@apollo/server"; // To startup apollo server
import { startStandaloneServer } from "@apollo/server/standalone"
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js"

// Setup server
const port = 4000
const server = new ApolloServer({
    // Typedefs (type definitions/ schemas and their relationsips)
    typeDefs:typeDefs,

    // Resolver functions
    resolvers:resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port:port }
})

console.log('service started...'); 
console.log('graphql server listening at port ', port);