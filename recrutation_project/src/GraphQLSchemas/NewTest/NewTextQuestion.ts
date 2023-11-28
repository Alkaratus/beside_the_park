import { Field, InputType } from '@nestjs/graphql';
import { NewTextAnswer } from './NewTextAnswer';

@InputType()
export class NewTextQuestion {
  @Field()
  content: string;

  @Field(() => [NewTextAnswer])
  answers: NewTextAnswer[];

  constructor(content?: string, answers?: NewTextAnswer[]) {
    this.content = content;
    this.answers = answers;
  }
}
