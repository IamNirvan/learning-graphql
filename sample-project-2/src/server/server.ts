import IServer from "./IServer.js";

export class ServerV1 implements IServer {
    readonly port: number;
    readonly typeDefs: any;
    readonly resolvers: any;

    constructor(port: number, typeDefs: any, resolvers: any) {
        this.port = port;
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
    }

    public start(): void {
        console.log("Server started");
    }

    // add a new method
    public stop(): void {
        console.log("Server stopped");
    }
}
