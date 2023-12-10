import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResultQuestion } from './Result.Question';

@ObjectType({ implements: ResultQuestion })
export class ResultOrderQuestion implements ResultQuestion {
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
