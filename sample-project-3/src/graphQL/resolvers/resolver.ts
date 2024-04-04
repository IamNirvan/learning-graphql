import resourceData from '../../data/resourceData.js'
import { Context } from '../context/Context';

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
        },
        async fruit(parent:any, args:any, context: Context) {
            let result = null;
            
            // Use the context to access the FruitAPI instance
            // Fetch data via the FruitAPI instance
            let fruitRes:Promise<any> = await context.fruitApi.getFruitInfo(args.name);
            
            // Create resulting object
            result = {
                name: (await fruitRes).name,
                family: (await fruitRes).family,
                order: (await fruitRes).order,
                genus: (await fruitRes).genus,
                nutritions: {
                    calories: (await fruitRes).nutritions.calories,
                    fat: (await fruitRes).nutritions.fat,
                    protein: (await fruitRes).nutritions.protein,
                    carbs: (await fruitRes).nutritions.carbohydrates
                }
            };

            // Return object
            return result;
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