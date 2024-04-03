import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone"
import { IGraphQLServer } from "../IGraphQLServer";
import { Context } from "../../context/Context";

/**
 * This implementation uses a standalone server. Not a middleware
 * @author Shalin Kulawardane
 */
export class GraphQLServerVersion1 implements IGraphQLServer {
    readonly port: number;
    readonly typeDefs: any;
    readonly resolvers: any;
    private readonly server: ApolloServer<Context>;
    
    constructor(port: number, typeDefs: any, resolvers: any) {
        this.port = port;
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
        this.server = this._createServer();
    }

    /**
     * Initializes the Apollo server instance and adds default configurations
     * @returns ApolloServer instance using custom context
     */
    private _createServer(): ApolloServer<Context> {
        let result =  new ApolloServer<Context>({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers,
            includeStacktraceInErrorResponses: false,
        });
        return result
    }

    /**
     * Creates the context object for the server.
     * @returns A Promise that resolves to the context object.
     */
    private async _createContext(): Promise<Context> {
        return {
            dbConnection: "mongodb://localhost:27017"
        }
    }

    async start(): Promise<void> {
        const { url } = await startStandaloneServer(this.server,
            {
                context: this._createContext,
                listen: {
                    port: this.port
                }
            }
        )
        console.log(`apollo server listening at ${url}`);
    }

    async stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}