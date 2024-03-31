import productsDb from "./data/products.js"
import productStatusDb from "./data/productStatus.js"

// Make resolvers for all the fields in the root of the Query type
const resolvers = {
    Product: {
        __resolveType(obj, context, info) {
            if (obj.carat) {
                return 'Jewellery'
            }

            if (obj.size) {
                return 'Clothes'
            }

            return null
        }
    },

    Query: {
        itemsByTenant(_, args) {
            let result = []
            
            productsDb.jewelleryItems.filter((item) => {
                if (item.tenant === args.tenant) {
                    // Add product details and the status from other data source...
                    result.push({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        tenant: item.tenant,
                        carat: item.carat,
                        status: productStatusDb.status.find((status) => status.id === item.statusId).name
                    })
                }
            })

            productsDb.clothes.filter((item) => {
                if (item.tenant === args.tenant) {
                    result.push(item)
                }
            })

            console.log(result)
            return result
        },
        search(_, args) {
            let result = []
            const keyword = args.keyword.toLowerCase()

            productsDb.jewelleryItems.filter((item) => {
                if (item.name.toLowerCase().includes(keyword)) {
                    result.push({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        tenant: item.tenant,
                        carat: item.carat,
                        status: productStatusDb.status.find((status) => status.id === item.statusId).name
                    })
                }
            })

            productsDb.clothes.filter((item) => {
                if (item.name.toLowerCase().includes(keyword)) {
                    result.push(item)
                }
            })

            console.log(result)
            return result
        }
    }
}

export default resolvers;