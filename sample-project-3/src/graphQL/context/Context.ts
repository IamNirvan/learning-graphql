import { FruitAPI } from "../dataloader/impl/FruitAPIDataLoader";

export interface Context {
    dbConnection: string;
    fruitApi: FruitAPI;
    // Share data adaptor reference here...
    // Share use details fetched from auth tokens here...
}