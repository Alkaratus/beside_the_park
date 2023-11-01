import {IndexService} from "./index.service";
import {Resolver, Query, Mutation, Args} from "@nestjs/graphql";
import {Test} from "../GraphQLSchemas/Test/Test";
import {NewTest} from "../GraphQLSchemas/NewTest/NewTest";
import {TestAnswers} from "../GraphQLSchemas/QuestionAnswers/TestAnswers";
import {TestResults} from "../GraphQLSchemas/Results/TestResults";

@Resolver()
export class IndexResolver{
    indexService: IndexService;

    constructor(indexService: IndexService){
        this.indexService=indexService;
    }

    @Query(()=>[Test])
    async getTests(){
        return await this.indexService.getTests();
    }

    @Mutation(() => Test)
    async createTest(@Args('newTest') newTest:NewTest){
        return await this.indexService.createNewTest(newTest);
    }

    @Mutation(()=>TestResults)
    async submitAnswers(@Args('answers') testAnswers:TestAnswers){
        return await this.indexService.checkAnswers(testAnswers);
    }

}