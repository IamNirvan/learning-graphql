import { ApolloServer, BaseContext } from '@apollo/server';
import { IGraphQLServer } from "../IGraphQLServer";
import { Context } from "../../context/Context";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { FruitAPI } from '../../dataloader/FruitAPIDataLoader';
import { CustomPlugin } from '../../plugins/CustomPlugin';

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
            // TODO: add this -> includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
            // TODO: add this -> introspection: process.env.NODE_ENV !== 'production',
            status400ForVariableCoercionErrors: true,
            plugins: [
                new CustomPlugin(),
                ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })
            ]
        });
        return result
    }

    async start(): Promise<void> {
        await this.server.start();
    }

    async stop(): Promise<void> {
        await this.server.stop();
    }

    getServer(): ApolloServer<Context> {
        return this.server;
    }
}