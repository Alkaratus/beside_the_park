import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QuestionAnswerText {
  @Field(() => Int)
  questionID: number;

  @Field()
  answer: string;
}
