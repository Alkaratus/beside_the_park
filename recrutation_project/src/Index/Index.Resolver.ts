import { IndexService } from './Index.Service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Test } from '../GraphQLSchemas/Test/Test';
import { NewTest } from '../GraphQLSchemas/NewTest/New.Test';
import { QuestionAnswerTestAnswers } from '../GraphQLSchemas/QuestionAnswers/QuestionAnswer.TestAnswers';
import { ResultTest } from '../GraphQLSchemas/Results/Result.Test';

@Resolver()
export class IndexResolver {
  indexService: IndexService;

  constructor(indexService: IndexService) {
    this.indexService = indexService;
  }

  @Query(() => [Test])
  async getTests() {
    return await this.indexService.getTests();
  }

  @Mutation(() => Test)
  async createTest(@Args('newTest') newTest: NewTest) {
    return await this.indexService.createNewTest(newTest);
  }

  @Mutation(() => ResultTest)
  async submitAnswers(@Args('answers') testAnswers: QuestionAnswerTestAnswers) {
    return await this.indexService.checkAnswers(testAnswers);
  }
}
