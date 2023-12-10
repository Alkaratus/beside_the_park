import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResultSingleChoiceQuestion } from './Result.SingleChoiceQuestion';
import { ResultMultipleChoiceQuestion } from './Result.MultipleChoiceQuestion';
import { ResultOrderQuestion } from './Result.OrderQuestion';
import { ResultTextQuestion } from './Result.TextQuestion';

@ObjectType()
export class ResultTest {
  @Field(() => Int)
  testID: number;
  @Field(() => Int)
  numberOfCorrect: number;
  @Field(() => [ResultSingleChoiceQuestion])
  singleChoiceQuestionResults: ResultSingleChoiceQuestion[];
  @Field(() => [ResultMultipleChoiceQuestion])
  multipleChoiceQuestionResults: ResultMultipleChoiceQuestion[];
  @Field(() => [ResultOrderQuestion])
  orderQuestionResults: ResultOrderQuestion[];
  @Field(() => [ResultTextQuestion])
  textQuestionResults: ResultTextQuestion[];

  constructor(
    testID: number = 0,
    numberOfCorrect: number = 0,
    singleChoiceQuestionResults?: ResultSingleChoiceQuestion[],
    multipleChoiceQuestionResults?: ResultMultipleChoiceQuestion[],
    orderQuestionResults?: ResultOrderQuestion[],
    textQuestionResults?: ResultTextQuestion[],
  ) {
    this.testID = testID;
    this.numberOfCorrect = numberOfCorrect;
    this.singleChoiceQuestionResults = singleChoiceQuestionResults;
    this.multipleChoiceQuestionResults = multipleChoiceQuestionResults;
    this.orderQuestionResults = orderQuestionResults;
    this.textQuestionResults = textQuestionResults;
  }

  setToDefault() {
    this.testID = 0;
    this.numberOfCorrect = 0;
    this.singleChoiceQuestionResults = [];
    this.multipleChoiceQuestionResults = [];
    this.orderQuestionResults = [];
    this.textQuestionResults = [];
  }
}
