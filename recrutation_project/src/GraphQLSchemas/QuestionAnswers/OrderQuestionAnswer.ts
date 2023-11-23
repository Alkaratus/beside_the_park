import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OrderQuestionAnswer {
  @Field(() => Int)
  questionID: number;

  @Field(() => [Int])
  answersIDsOrder: number[];
}
