import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResultQuestion } from './Result.Question';

@ObjectType({ implements: ResultQuestion })
export class ResultSingleChoiceQuestion implements ResultQuestion {
  questionID: number;
  correct: boolean;

  @Field(() => Int, { nullable: true })
  correctAnswerID: number;

  constructor(
    questionID?: number,
    correct?: boolean,
    correctAnswerID?: number,
  ) {
    this.questionID = questionID;
    this.correct = correct;
    this.correctAnswerID = correctAnswerID;
  }
}
