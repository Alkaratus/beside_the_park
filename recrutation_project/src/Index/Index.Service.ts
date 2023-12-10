import { Injectable } from '@nestjs/common';
import { DataBaseService } from '../DataBase/DataBase.Service';
import { ConverterEntityToGraphQL } from '../Converters/Converter.EntityToGraphQL';
import { CheckerTest } from '../TestChecker/Checker.Test';
import { Test as TestQL } from '../GraphQLSchemas/Test/Test';
import { NewTest } from '../GraphQLSchemas/NewTest/New.Test';
import { QuestionAnswerTestAnswers } from '../GraphQLSchemas/QuestionAnswers/QuestionAnswer.TestAnswers';

@Injectable()
export class IndexService {
  tests: TestQL[] = [];
  databaseService: DataBaseService;
  constructor(databaseService: DataBaseService) {
    this.databaseService = databaseService;
  }

  private async importDataFromDB() {
    const testsFromDb = await this.databaseService.getAllTests();
    const converter: ConverterEntityToGraphQL = new ConverterEntityToGraphQL();
    this.tests = [];
    testsFromDb.forEach((test) => {
      this.tests.push(converter.convertTest(test));
    });
  }

  private async getTestFromDB(id: number) {
    return await this.databaseService.getTestById(id);
  }

  async getTests() {
    await this.importDataFromDB();
    return this.tests;
  }

  async createNewTest(newTest: NewTest) {
    const newTestDB = await this.databaseService.addNewTest(newTest);
    const converter: ConverterEntityToGraphQL = new ConverterEntityToGraphQL();
    const convertedTest = converter.convertTest(newTestDB);
    this.tests.push(convertedTest);
    return convertedTest;
  }

  async checkAnswers(testAnswers: QuestionAnswerTestAnswers) {
    const test = await this.getTestFromDB(testAnswers.testID);
    const testChecker = new CheckerTest();
    return testChecker.checkTestAnswers(test, testAnswers);
  }
}
