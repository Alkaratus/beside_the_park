import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionResult } from './QuestionResult';

@ObjectType({ implements: QuestionResult })
export class OrderQuestionResult implements QuestionResult {
  questionID: number;
  correct: boolean;

  @Field(() => [Int], { nullable: true })
  correctAnswersIDsOrder: number[];

  constructor(
    questionID?: number,
    correct?: boolean,
    correctAnswersIDsOrder?: number[],
  ) {
    this.questionID = questionID;
    this.correct = correct;
    this.correctAnswersIDsOrder = correctAnswersIDsOrder;
  }
}
