import { FruitAPI } from "../dataloader/FruitAPIDataLoader";

export interface Context {
    fruitApi: FruitAPI;
    clientId?: string
}