import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuestionAnswerMultipleChoice {
  @Field(() => Int)
  questionID: number;

  @Field(() => [Int])
  answersIDs: number[];
}
