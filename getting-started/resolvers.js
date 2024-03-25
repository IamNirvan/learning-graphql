import db from "./data/db.js"

// Make resolvers for all the fields in the root of the Query type
const resolvers = {
    Query: {
        games() {
            // Send games from the db. Apollo will handle providing the exact field from the data the user has is requesting
            return db.games
        },
        reviews() {
            // Send revires from the db. Apollo will handle providing the exact field from the data the user has is requesting
            return db.reviews
        },
        authors() {
            // Send authors from the db. Apollo will handle providing the exact field from the data the user has is requesting
            return db.authors
        }
    }
}

export default resolvers;