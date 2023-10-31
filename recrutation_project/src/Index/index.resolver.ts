import {IndexService} from "./index.service";
import {Resolver, Query, Mutation, Args} from "@nestjs/graphql";
import {Test} from "../GraphQLSchemas/Test/Test";
import {NewTest} from "../GraphQLSchemas/NewTest/NewTest";
import {TestAnswers} from "../GraphQLSchemas/QuestionAnswers/TestAnswers";
import {TestResults} from "../GraphQLSchemas/Results/TestResults";

@Resolver(of=>Test)
export class IndexResolver{
    indexService: IndexService;

    constructor(indexService: IndexService){
        this.indexService=indexService;
    }

    @Query(returns=>[Test])
    async getTests(){
        return await this.indexService.getTests();
    }

    @Mutation(returns => Test)
    async createTest(@Args('newTest') newTest:NewTest){
        return await this.indexService.createNewTest(newTest);
    }

    @Mutation(returns=>TestResults)
    async submitAnswers(@Args('answers') testAnswers:TestAnswers){
        return await this.indexService.checkAnswers(testAnswers);
    }

}