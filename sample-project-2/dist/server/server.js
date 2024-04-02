export class ServerV1 {
    constructor(port, typeDefs, resolvers) {
        this.port = port;
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
    }
    start() {
        console.log("Server started");
    }
    // add a new method
    stop() {
        console.log("Server stopped");
    }
}
