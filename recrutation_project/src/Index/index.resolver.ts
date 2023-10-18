import {IndexService} from "./index.service";
import {Resolver, Query} from "@nestjs/graphql";

@Resolver('')
export class IndexResolver{
    indexService: IndexService;

    constructor(indexService: IndexService){
        this.indexService=indexService;
    }

    @Query("tests")
    async getTests(){
        return await this.indexService.getTests();
    }



}