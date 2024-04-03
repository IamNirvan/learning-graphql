export interface IGraphQLServer {
    readonly typeDefs: any;
    readonly resolvers: any;

    start(): Promise<void>;
    stop(): Promise<void>;
}