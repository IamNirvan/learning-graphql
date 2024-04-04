const typeDefs = `#graphql
    type ResourceType {
        id: ID!
        name: String!
        displayName: String!
        resources: [Resource!]
        tenant: Int!
        items: [Item!]
    }

    type Resource {
        id: ID!
        name: String!
        resourceType: ResourceType
        scheme: String!
        items: [Item!]
        tenant: Int!
        keyword: String!
    }

    type ItemField {
        id: ID!
        name: String!
        displayName: String!
        dataType: String!
        value: String!
    }

    type Item {
        id: ID!
        epc: String!
        resource: Resource!
        status: String!
        eventHistory: [String!]!
        fields: [ItemField!]
        tenant: Int!
    }

    type Fruit {
        name: String!
        family: String!
        order: String!
        genus: String!
        nutritions: Nutritions!
    }
    
    type Nutritions {
        calories: Float!
        fat: Float!
        protein: Float!
        carbs: Float!
    }

    type Query {
        resourceTypes: [ResourceType!]
        resources: [Resource!]
        items: [Item!]
        fruit(name: String!): Fruit
    }
`
 
export default typeDefs