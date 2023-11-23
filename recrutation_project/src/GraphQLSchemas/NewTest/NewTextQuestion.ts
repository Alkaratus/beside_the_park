import { Field, InputType } from '@nestjs/graphql';
import { NewTextAnswer } from './NewTextAnswer';
import { Visitor } from '../../Abstracts/Visitor';
import { TextQuestion as AbstractTextQuestion } from '../../Abstracts/TextQuestion';

@InputType()
export class NewTextQuestion implements AbstractTextQuestion {
  @Field()
  content: string;

  @Field(() => [NewTextAnswer])
  answers: NewTextAnswer[];

  constructor(content?: string, answers?: NewTextAnswer[]) {
    this.content = content;
    this.answers = answers;
  }

  accept(visitor: Visitor): void {
    visitor.visitNewTextQuestion(this);
  }
}
