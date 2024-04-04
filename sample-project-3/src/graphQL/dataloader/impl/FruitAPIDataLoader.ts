import { RESTDataSource } from "@apollo/datasource-rest";

export class FruitAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://www.fruityvice.com/api/fruit/";
    }

    async getFruitInfo(fruit: string) {
        let res =  this.get(fruit);
        return res;
    }
}