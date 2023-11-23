import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class QuestionResult {
  @Field(() => Int)
  questionID: number;

  @Field()
  correct: boolean;
}
