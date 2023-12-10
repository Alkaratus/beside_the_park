import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuestionAnswerOrder {
  @Field(() => Int)
  questionID: number;

  @Field(() => [Int])
  answersIDsOrder: number[];
}
