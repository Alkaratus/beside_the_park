import { Field, ObjectType } from '@nestjs/graphql';
import { TextAnswer } from './TextAnswer';
import { TestQuestion } from './Test.Question';
import { AbstractTextQuestion as AbstractTextQuestion } from '../../Abstracts/Abstract.TextQuestion';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@ObjectType({ implements: TestQuestion })
export class TextQuestion implements TestQuestion, AbstractTextQuestion {
  id: number;
  content: string;

  @Field(() => [TextAnswer])
  textAnswers: TextAnswer[];

  constructor(id?: number, content?: string, textAnswers?: TextAnswer[]) {
    this.id = id;
    this.content = content;
    this.textAnswers = textAnswers;
  }

  accept(visitor: AbstractVisitor): void {
    visitor.visitTextQuestionQL(this);
  }
}
