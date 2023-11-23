import { Injectable } from '@nestjs/common';
import { DataBaseServiceService } from '../DataBaseService/DataBaseService.service';
import { EntityToGraphQLConverter } from '../Converters/EntityToGraphQLConverter';
import { TestChecker } from '../TestChecker/TestChecker';
import { Test as TestQL } from '../GraphQLSchemas/Test/Test';
import { NewTest } from '../GraphQLSchemas/NewTest/NewTest';
import { TestAnswers } from '../GraphQLSchemas/QuestionAnswers/TestAnswers';

@Injectable()
export class IndexService {
  tests: TestQL[] = [];
  databaseService: DataBaseServiceService;
  constructor(databaseService: DataBaseServiceService) {
    this.databaseService = databaseService;
  }

  private async importDataFromDB() {
    const testsFromDb = await this.databaseService.getAllTests();
    const converter: EntityToGraphQLConverter = new EntityToGraphQLConverter();
    this.tests = [];
    testsFromDb.forEach((test) => {
      this.tests.push(converter.convertTest(test));
    });
  }

  async getTests() {
    await this.importDataFromDB();
    return this.tests;
  }

  async createNewTest(newTest: NewTest) {
    const newTestDB = await this.databaseService.addNewTest(newTest);
    const converter: EntityToGraphQLConverter = new EntityToGraphQLConverter();
    const convertedTest = converter.convertTest(newTestDB);
    this.tests.push(convertedTest);
    return convertedTest;
  }

  async checkAnswers(testAnswers: TestAnswers) {
    await this.importDataFromDB();
    const checkedTest = this.tests.find(
      (test) => test.id == testAnswers.testID,
    );
    const testChecker = new TestChecker();
    return testChecker.checkTestAnswers(checkedTest, testAnswers);
  }
}
