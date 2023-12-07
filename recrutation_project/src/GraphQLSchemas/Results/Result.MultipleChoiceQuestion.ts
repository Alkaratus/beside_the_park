import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResultQuestion } from './Result.Question';

@ObjectType({ implements: ResultQuestion })
export class ResultMultipleChoiceQuestion {
  questionID: number;
  correct: boolean;

  @Field(() => [Int], { nullable: true })
  correctAnswersIDs: number[];

  constructor(
    questionID?: number,
    correct?: boolean,
    correctAnswersIDs?: number[],
  ) {
    this.questionID = questionID;
    this.correct = correct;
    this.correctAnswersIDs = correctAnswersIDs;
  }
}
