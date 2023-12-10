import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class ResultQuestion {
  @Field(() => Int)
  questionID: number;

  @Field()
  correct: boolean;
}
