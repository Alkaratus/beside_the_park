import { Field, InterfaceType } from '@nestjs/graphql';
import { TestQuestion } from './Test.Question';
import { TestChoiceAnswer } from './Test.ChoiceAnswer';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@InterfaceType({ implements: TestQuestion })
export abstract class TestChoiceQuestion implements TestQuestion {
  id: number;
  content: string;
  @Field(() => [TestChoiceAnswer])
  choiceAnswers: TestChoiceAnswer[];

  protected constructor(
    id?: number,
    content?: string,
    choiceAnswers?: TestChoiceAnswer[],
  ) {
    this.id = id;
    this.content = content;
    this.choiceAnswers = choiceAnswers;
  }

  abstract accept(visitor: AbstractVisitor): void;
}
