import { Field, InputType } from '@nestjs/graphql';
import { NewChoiceAnswer } from './New.ChoiceAnswer';

@InputType()
export class NewMultipleChoiceQuestion {
  @Field()
  content: string;

  @Field(() => [NewChoiceAnswer])
  answers: NewChoiceAnswer[];

  constructor(content?: string, answers?: NewChoiceAnswer[]) {
    this.content = content;
    this.answers = answers;
  }
}
