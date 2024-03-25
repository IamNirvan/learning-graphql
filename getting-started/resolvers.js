import db from "./data/db.js"

// Make resolvers for all the fields in the root of the Query type
const resolvers = {
    Query: {
        games() {
            // Send games from the db. Apollo will handle providing the exact field from the data the user has is requesting
            return db.games
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id)
        },
        reviews() {
            // Send revires from the db. Apollo will handle providing the exact field from the data the user has is requesting
            return db.reviews
        },
        // parent, args, context
        review(_, args){
            return db.reviews.find((review) => review.id == args.id)
        },
        authors() {
            // Send authors from the db. Apollo will handle providing the exact field from the data the user has is requesting
            return db.authors
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id)
        }
    },

    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },

    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    },

    Review: {
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id)
        }
    }

}

export default resolvers;