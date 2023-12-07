import { Field, ObjectType } from '@nestjs/graphql';
import { TestQuestion } from './Test.Question';
import { TestOrderAnswer } from './Test.OrderAnswer';
import { AbstractOrderQuestion as AbstractOrderQuestion } from '../../Abstracts/Abstract.OrderQuestion';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@ObjectType({ implements: TestQuestion })
export class TestOrderQuestion implements TestQuestion, AbstractOrderQuestion {
  id: number;
  content: string;
  @Field(() => [TestOrderAnswer])
  orderAnswers: TestOrderAnswer[];

  constructor(id?: number, content?: string, orderAnswers?: TestOrderAnswer[]) {
    this.id = id;
    this.content = content;
    this.orderAnswers = orderAnswers;
  }

  accept(visitor: AbstractVisitor): void {
    visitor.visitOrderQuestionQL(this);
  }
}
