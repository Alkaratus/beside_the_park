import { ObjectType } from '@nestjs/graphql';
import { TestChoiceQuestion } from './Test.ChoiceQuestion';
import { TestChoiceAnswer } from './Test.ChoiceAnswer';
import { TestQuestion } from './Test.Question';
import { AbstractMultipleChoiceQuestion as AbstractMultipleChoiceQuestion } from '../../Abstracts/Abstract.MultipleChoiceQuestion';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@ObjectType({ implements: [TestQuestion, TestChoiceQuestion] })
export class TestMultipleChoiceQuestion
  implements TestChoiceQuestion, AbstractMultipleChoiceQuestion
{
  id: number;
  content: string;
  choiceAnswers: TestChoiceAnswer[];

  constructor(id?: number, content?: string, choiceAnswers?: TestChoiceAnswer[]) {
    this.id = id;
    this.content = content;
    this.choiceAnswers = choiceAnswers;
  }

  accept(visitor: AbstractVisitor): void {
    visitor.visitMultipleChoiceQuestionQL(this);
  }
}
