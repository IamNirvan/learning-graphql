const typeDefs = `#graphql
 
    interface Product {
        id: ID!
        name: String!
        price: Float!
        tenant: Int!
    }

    type Jewellery implements Product {
        id: ID!
        name: String!
        price: Float!
        carat: Int!
        tenant: Int!
        status: String!
    }

    type Clothes implements Product {
        id: ID!
        name: String!
        price: Float!
        size: String!
        tenant: Int!
    }

    type Query {
        itemsByTenant(tenant: Int!): [Product!]
        search(keyword: String!): [Product!]
    }

`
 
export default typeDefs