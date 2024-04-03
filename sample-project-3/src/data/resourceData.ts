const resourceTypes = [
    {id: 1, name: "Resource Type 1", displayName: "Resource Type 1", tenant: 1},
    {id: 2, name: "Resource Type 2", displayName: "Resource Type 2", tenant: 1},
]

const resources = [
    {id: 1, name: "Resource 1", displayName: "Resource 1", scheme: "RFID_CORE_96", resourceType: 1, tenant: 1},
    {id: 2, name: "Resource 2", displayName: "Resource 2", scheme: "RFID_CORE_96", resourceType: 1, tenant: 1},
    {id: 3, name: "Resource 4", displayName: "Resource 4", scheme: "RFID_CORE_96", resourceType: 2, tenant: 1},
]

const items = [
    {id: 1, epc:"000312312", resource: 1, status: "Active", eventHistory: ["Created"], tenant: 1},
    {id: 2, epc:"000319922", resource: 1, status: "Sold", eventHistory: ["Sold", "Created"], tenant: 1},
    {id: 3, epc:"000021465", resource: 2, status: "Missing", eventHistory: ["Missing", "Created"], tenant: 1},
    {id: 4, epc:"000078891", resource: 3, status: "Active", eventHistory: ["Found", "Missing", "Created"], tenant: 1},
]

const itemFields = [
    {id: 1, name: "Field 1", displayName: "Field 1", dataType: "String", value: "Value 1", item: 1},
    {id: 1, name: "Field 2", displayName: "Field 2", dataType: "String", value: "Value 1", item: 1},
    {id: 1, name: "Field 3", displayName: "Field 3", dataType: "String", value: "Value 1", item: 1},
    {id: 1, name: "Field 4", displayName: "Field 4", dataType: "String", value: "Value 1", item: 2},
    {id: 1, name: "Field 1", displayName: "Field 1", dataType: "String", value: "Value 1", item: 2},
    {id: 1, name: "Field 2", displayName: "Field 2", dataType: "String", value: "Value 1", item: 3},
    {id: 1, name: "Field 2", displayName: "Field 2", dataType: "String", value: "Value 1", item: 3},
]

export default { resourceTypes, resources, items, itemFields }