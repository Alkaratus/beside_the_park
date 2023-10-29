import {IndexService} from "./index.service";
import {Resolver, Query, ResolveField, Mutation, Args} from "@nestjs/graphql";
import {Test as TestDTO} from "../Abstracts/Test"
import {TestAnswers as TestAnswersDTO} from "../TestChecker/Answers/TestAnswers";

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
    async createTest(@Args('newTest') newTest:TestDTO){
        return await this.indexService.createNewTest(newTest);
    }

    @Mutation("submitAnswers")
    async submitAnswers(@Args('answers') testAnswers:TestAnswersDTO){
        return await this.indexService.checkAnswers(testAnswers);
    }

}