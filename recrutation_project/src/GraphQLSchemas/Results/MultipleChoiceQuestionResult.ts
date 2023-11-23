import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionResult } from './QuestionResult';

@ObjectType({ implements: QuestionResult })
export class MultipleChoiceQuestionResult {
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
