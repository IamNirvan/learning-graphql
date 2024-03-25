const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    # Need to have a query type. Defines the entry points to the graph and the values that can be returned...
    type Query {
        reviews: [Review]               # Returns all reviews
        review(id: ID!): Review         # Returns a single review
        games: [Game]                   # Returns all games
        game(id: ID!): Game             # Returns a single game
        authors: [Author]               # Returns all authors
        author(id: ID!): Author         # Returns a single author
    }

    # Mutations allow the client to perform manipulations on the data...
    type Mutation {
        addGame(game: AddGameInput!): Game
        deleteGame(id: ID!): [Game]
        updateGame(id: ID!, edits: UpdateGameInput!): Game
    }

    input AddGameInput {
        title: String!,
        platform: [String!]!
    }

    input UpdateGameInput {
        title: String,
        platform: [String!]
    }
`
 
export default typeDefs