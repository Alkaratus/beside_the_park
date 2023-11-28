import { Field, InputType } from '@nestjs/graphql';
import { NewOrderAnswer } from './NewOrderAnswer';

@InputType()
export class NewOrderQuestion {
  @Field()
  content: string;

  @Field(() => [NewOrderAnswer])
  answers: NewOrderAnswer[];

  constructor(content?: string, answers?: NewOrderAnswer[]) {
    this.content = content;
    this.answers = answers;
  }
}
