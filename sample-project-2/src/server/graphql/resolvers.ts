import { GraphQLError } from 'graphql'
import db from '../../data/db.js'
import { MaxFetchReachedError } from '../../errors/MaxFetchReachedError.js'

const maxFetchCount: number = 3;
let currentFetchCount: number = 0;

// Make resolvers for all the fields in the root of the Query type
const resolvers = {
    Query: {
        games() {
            // Send games from the db. Apollo will handle providing the exact field from the data the user has is requesting
            return db.games
        },
        game(_: any, args:any) {
            return db.games.find((game) => game.id === args.id)
        },
        reviews() {
            // Send revires from the db. Apollo will handle providing the exact field from the data the user has is requesting
            return db.reviews
        },
        // parent, args, context
        review(_: any, args: any){
            return db.reviews.find((review) => review.id == args.id)
        },
        authors(parent: any, args: any, context: any, info: any) {
            // Send authors from the db. Apollo will handle providing the exact field from the data the user has is requesting
            console.log(context);
            return db.authors
        },
        author(_:any , args: any) {
            if (args.id < 1) {
                throw new GraphQLError("Invalid author id", {
                    extensions: {
                      code: "BAD_USER_INPUT",  
                      argumentName: "id",
                      value: args.id,
                    },
                }) 
            }

            if (currentFetchCount == maxFetchCount) {
                throw new MaxFetchReachedError("You have reached your fetch limit")
            }
    
            currentFetchCount += 1;
            return db.authors.find((author) => author.id === args.id)
        }
    },

    Game: {
        reviews(parent: any) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },

    Author: {
        reviews(parent: any) {
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    },

    Review: {
        game(parent: any) {
            return db.games.find((game) => game.id === parent.game_id)
        },
        author(parent: any) {
            return db.authors.find((author) => author.id === parent.author_id)
        }
    },

    Mutation: {
        addGame(_: any, args: any) {
            let newGame = {
                ...args.game,
                id: db.games.length
            }
            console.log('adding game: ', newGame);
            db.games.push(newGame)
            return newGame
        },

        deleteGame(_: any, args: any) {
            db.games = db.games.filter((game) => game.id !== args.id)
            console.log('Deleted game with id ', args.id);
            return db.games
        },

        updateGame(_: any, args: any) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return {...game, ...args.edits} // This overrides the old fields (...game) with the new field(s) (...args.edits)
                }
                return game
            })

            return db.games.find((game) => game.id === args.id)
        }
    }

}

export default resolvers;