export default interface IServer {
    readonly port: number;
    readonly typeDefs: any;
    readonly resolvers: any;

    start: () => void;
}