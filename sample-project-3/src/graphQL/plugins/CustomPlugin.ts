import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from "@apollo/server";
import { Context } from "../context/Context";

export class CustomPlugin implements ApolloServerPlugin<Context> {
    async requestDidStart(context: GraphQLRequestContext<Context>): Promise<void | GraphQLRequestListener<Context>> {
        console.log(context.contextValue.clientId);
    }
}