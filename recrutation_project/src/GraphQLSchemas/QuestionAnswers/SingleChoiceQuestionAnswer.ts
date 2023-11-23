import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SingleChoiceQuestionAnswer {
  @Field(() => Int)
  questionID: number;

  @Field(() => Int)
  answerID: number;
}
