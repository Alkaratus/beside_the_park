import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuestionAnswerSingleChoice {
  @Field(() => Int)
  questionID: number;

  @Field(() => Int)
  answerID: number;
}
