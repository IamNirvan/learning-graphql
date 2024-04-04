import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone"
import { IGraphQLServer } from "../IGraphQLServer.js";
import { Context } from "../../context/Context.js";
import { CustomPlugin } from '../../plugins/CustomPlugin.js';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { FruitAPI } from '../../dataloader/impl/FruitAPIDataLoader.js';

/**
 * This implementation uses the middleware approach
 * @author Shalin Kulawardane
 */
export class GraphQLServerVersion2 implements IGraphQLServer {
    readonly typeDefs: any;
    readonly resolvers: any;
    readonly httpServer: any;
    private readonly server: ApolloServer<Context>;
    
    constructor(typeDefs: any, resolvers: any , httpServer: any) {
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
        this.httpServer = httpServer;
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
            // includeStacktraceInErrorResponses: false,
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })
            ]
        });
        return result
    }

    /**
     * Creates the context object for the server.
     * @returns A Promise that resolves to the context object.
     */
    async createContext(): Promise<Context> {
        const context = {
            dbConnection: "mongodb://localhost:27017",
            fruitApi: new FruitAPI(),
        }
        return context;
    }

    async start(): Promise<void> {
        await this.server.start();
    }

    async stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    getServer(): ApolloServer<Context> {
        return this.server;
    }
}