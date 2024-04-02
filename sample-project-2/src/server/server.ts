import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone"

export class ServerV1 {
    readonly port: number;
    readonly typeDefs: any;
    readonly resolvers: any;
    private _server: ApolloServer

    constructor(port: number, typeDefs: any, resolvers: any) {
        this.port = port;
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
        this._server = this._createServer();
    }

    private _createServer(): ApolloServer<BaseContext> {
        return new ApolloServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers
        });
    }

    public async start(): Promise<void> {
        const { url } = await startStandaloneServer(this._server, { 
            listen: { 
                port: this.port 
            }
         })
        console.log(`Server started on port ${this.port} at ${url}`);
    }

    // add a new method
    public stop(): void {
        console.log("Server stopped");
    }
}
