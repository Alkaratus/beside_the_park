import { Field, InputType } from '@nestjs/graphql';
import { NewChoiceAnswer } from './NewChoiceAnswer';
import { MultipleChoiceQuestion as AbstractMultipleChoiceQuestion } from '../../Abstracts/MultipleChoiceQuestion';
import { Visitor } from '../../Abstracts/Visitor';

@InputType()
export class NewMultipleChoiceQuestion
  implements AbstractMultipleChoiceQuestion
{
  @Field()
  content: string;

  @Field(() => [NewChoiceAnswer])
  answers: NewChoiceAnswer[];

  constructor(content?: string, answers?: NewChoiceAnswer[]) {
    this.content = content;
    this.answers = answers;
  }

  accept(visitor: Visitor) {
    visitor.visitNewMultipleChoiceQuestion(this);
  }
}
