import { ResultQuestion } from './Result.Question';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ implements: ResultQuestion })
export class ResultTextQuestion implements ResultQuestion {
  questionID: number;
  correct: boolean;

  @Field(() => [String], { nullable: true })
  correctAnswers: string[];

  constructor(
    questionID?: number,
    correct?: boolean,
    correctAnswers?: string[],
  ) {
    this.questionID = questionID;
    this.correct = correct;
    this.correctAnswers = correctAnswers;
  }
}
