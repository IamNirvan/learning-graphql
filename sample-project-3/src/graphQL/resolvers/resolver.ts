import resourceData from '../../data/resourceData.js'

const resolvers = {
    Query: {
        resourceTypes() {
            return resourceData.resourceTypes;
        },
        resources() {
            return resourceData.resources;
        },
        items() {
            return resourceData.items;
        }
    },
    //
    // Resource Type
    //
    ResourceType: {
        resources: (parent: any) => {
            return resourceData.resources.filter(resource => resource.resourceType === parent.id);
        },
        items: (parent: any) => {
            let resources =  resourceData.resources.filter(resource => resource.resourceType === parent.id);
            let items = resourceData.items.filter(item => resources.some(resource => resource.id === item.resource));
            return items;
        }
    },
    //
    // Resource
    //
    Resource: {
        resourceType: (parent: any) => {
            return resourceData.resourceTypes.find(resourceType => resourceType.id === parent.resourceType);
        },
        items: (parent: any) => {
            return resourceData.items.filter(item => item.resource === parent.id);
        }
    },
    //
    // Item
    //
    Item: {
        resource: (parent: any) => {
            return resourceData.resources.find(resource => resource.id === parent.resource);
        },
        fields: (parent: any) => {
            return resourceData.itemFields.filter(field => field.item === parent.id);
        }
    }
}

export default resolvers;