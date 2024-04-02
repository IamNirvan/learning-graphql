var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone";
export class ServerV1 {
    constructor(port, typeDefs, resolvers) {
        this.port = port;
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
        this._server = this._createServer();
    }
    _createServer() {
        return new ApolloServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = yield startStandaloneServer(this._server, {
                listen: {
                    port: this.port
                }
            });
            console.log(`Server started on port ${this.port} at ${url}`);
        });
    }
    // add a new method
    stop() {
        console.log("Server stopped");
    }
}
