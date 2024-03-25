const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }

    # Need to have a query type. Defines the entry points to the graph and the values that can be returned...
    type Query {
        reviews: [Review]
        games: [Game]
        authors: [Author]
    }
`

export default typeDefs