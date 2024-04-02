import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone"

interface MyContext {
    connectString?: string;
    // Add other necessary properties here that need to be shared across resolvers
}

/**
 * Represents a server instance.
 */
export class ServerV1 {
    readonly port: number;
    readonly typeDefs: any;
    readonly resolvers: any;
    private readonly _server: ApolloServer;

    /**
     * Creates a new ServerV1 instance.
     * @param port - The port number to listen on.
     * @param typeDefs - The GraphQL type definitions.
     * @param resolvers - The GraphQL resolvers.
     */
    constructor(port: number, typeDefs: any, resolvers: any) {
        this.port = port;
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
        this._server = this._createServer();
    }

    private _createServer(): ApolloServer<MyContext> {
        let result =  new ApolloServer<MyContext>({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers
        });
        return result
    }

    /**
     * Creates the context object for the server.
     * @returns A Promise that resolves to the context object.
     */
    private async _createContext(): Promise<MyContext> {
        return {
            connectString: "mongodb://localhost:27017"
        }
    }

    /**
     * Starts the server.
     * @returns A Promise that resolves when the server has started.
     */
    public async start(): Promise<void> {
        const { url } = await startStandaloneServer(this._server, {
            context: this._createContext,
            listen: { 
                port: this.port 
            }
         })
        console.log(`Server started on port ${this.port} at ${url}`);
    }

    /**
     * Stops the server.
     */
    public stop(): void {
        console.log("Server stopped");
    }
}
