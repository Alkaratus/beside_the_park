import { ObjectType } from '@nestjs/graphql';
import { TestChoiceQuestion } from './Test.ChoiceQuestion';
import { TestChoiceAnswer } from './Test.ChoiceAnswer';
import { TestQuestion } from './Test.Question';
import { AbstractSingleChoiceQuestion as AbstractSingleChoiceQuestion } from '../../Abstracts/Abstract.SingleChoiceQuestion';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@ObjectType({ implements: [TestQuestion, TestChoiceQuestion] })
export class TestSingleChoiceQuestion
  implements TestChoiceQuestion, AbstractSingleChoiceQuestion
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
    visitor.visitSingleChoiceQuestionQL(this);
  }
}
