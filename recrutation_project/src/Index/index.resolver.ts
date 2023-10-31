import {IndexService} from "./index.service";
import {Resolver, Query, Mutation, Args} from "@nestjs/graphql";
import {NewTest, TestAnswers} from "../graphql";

@Resolver('Test')
export class IndexResolver{
    indexService: IndexService;

    constructor(indexService: IndexService){
        this.indexService=indexService;
    }

    @Query("tests")
    async getTests(){
        return await this.indexService.getTests();
    }

    @Mutation("createTest")
    async createTest(@Args('newTest') newTest:NewTest){
        return await this.indexService.createNewTest(newTest);
    }

    @Mutation("submitAnswers")
    async submitAnswers(@Args('answers') testAnswers:TestAnswers){
        return await this.indexService.checkAnswers(testAnswers);
    }

}