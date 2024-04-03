export interface IGraphQLServer {
    readonly port: number;
    readonly typeDefs: any;
    readonly resolvers: any;

    start(): Promise<void>;
    stop(): Promise<void>;
}