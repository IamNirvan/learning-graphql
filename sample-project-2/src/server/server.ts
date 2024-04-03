import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone"
import { unwrapResolverError } from '@apollo/server/errors';
import { MaxFetchReachedError } from '../errors/MaxFetchReachedError.js';

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
            resolvers: this.resolvers,

            // This allows you to manually specify whether a stack trace will be returned in errors or not...
            includeStacktraceInErrorResponses: false,

            // This is a hook that allows you to intercept an error before it is sent to the client and do whatever you want to do with it...
            formatError: (formattedError, error) =>  {
                // Access the original error and handle MaxFetchReachedError accordingly
                if (unwrapResolverError(error) instanceof MaxFetchReachedError) {
                    let err =  error as MaxFetchReachedError;
                    return {
                        message: err.message,
                        extensions: {
                            errorCode: 429,
                        }
                    }
                }
                return formattedError;
            },
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
