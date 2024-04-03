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
import { unwrapResolverError } from '@apollo/server/errors';
import { MaxFetchReachedError } from '../errors/MaxFetchReachedError.js';
/**
 * Represents a server instance.
 */
export class ServerV1 {
    /**
     * Creates a new ServerV1 instance.
     * @param port - The port number to listen on.
     * @param typeDefs - The GraphQL type definitions.
     * @param resolvers - The GraphQL resolvers.
     */
    constructor(port, typeDefs, resolvers) {
        this.port = port;
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
        this._server = this._createServer();
    }
    _createServer() {
        let result = new ApolloServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers,
            // This allows you to manually specify whether a stack trace will be returned in errors or not...
            includeStacktraceInErrorResponses: false,
            // This is a hook that allows you to intercept an error before it is sent to the client and do whatever you want to do with it...
            formatError: (formattedError, error) => {
                // Access the original error and handle MaxFetchReachedError accordingly
                if (unwrapResolverError(error) instanceof MaxFetchReachedError) {
                    let err = error;
                    return {
                        message: err.message,
                        extensions: {
                            errorCode: 429,
                        }
                    };
                }
                return formattedError;
            },
        });
        return result;
    }
    /**
     * Creates the context object for the server.
     * @returns A Promise that resolves to the context object.
     */
    _createContext() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                connectString: "mongodb://localhost:27017"
            };
        });
    }
    /**
     * Starts the server.
     * @returns A Promise that resolves when the server has started.
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = yield startStandaloneServer(this._server, {
                context: this._createContext,
                listen: {
                    port: this.port
                }
            });
            console.log(`Server started on port ${this.port} at ${url}`);
        });
    }
    /**
     * Stops the server.
     */
    stop() {
        console.log("Server stopped");
    }
}
