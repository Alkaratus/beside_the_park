import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MultipleChoiceQuestionAnswer {
  @Field(() => Int)
  questionID: number;

  @Field(() => [Int])
  answersIDs: number[];
}
