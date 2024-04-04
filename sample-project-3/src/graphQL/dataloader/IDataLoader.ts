/**
 * Dataloaders are utility classes that are used to batch and cache requests to the database. This ensures that
 * resolvers do not make more requests to the database than necessary. 
 * 
 * Therefore, infamous problems like n+1 problem https://shopify.engineering/solving-the-n-1-problem-for-graphql-through-batching
 * can be solved using dataloaders.
 * 
 * @author Shalin Kulawardane
 */

interface IDataLoader {
    initializeSource(): Promise<void>;
    shutdown(): void;
}
