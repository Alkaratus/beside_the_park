import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TestSingleChoiceQuestion } from './Test.SingleChoiceQuestion';
import { TestMultipleChoiceQuestion } from './Test.MultipleChoiceQuestion';
import { TestOrderQuestion } from './Test.OrderQuestion';
import { TextQuestion } from './TextQuestion';
import { AbstractTest as AbstractTest } from '../../Abstracts/Abstract.Test';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@ObjectType()
export class Test implements AbstractTest {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [TestSingleChoiceQuestion])
  singleChoiceQuestions: TestSingleChoiceQuestion[];

  @Field(() => [TestMultipleChoiceQuestion])
  multipleChoiceQuestions: TestMultipleChoiceQuestion[];

  @Field(() => [TestOrderQuestion])
  orderQuestions: TestOrderQuestion[];

  @Field(() => [TextQuestion])
  textQuestions: TextQuestion[];

  constructor(
    id: number = 0,
    name: string = '',
    singleChoiceQuestions?: TestSingleChoiceQuestion[],
    multipleChoiceQuestions?: TestMultipleChoiceQuestion[],
    orderQuestions?: TestOrderQuestion[],
    textQuestions?: TextQuestion[],
  ) {
    this.id = id;
    this.name = name;
    this.singleChoiceQuestions = singleChoiceQuestions;
    this.multipleChoiceQuestions = multipleChoiceQuestions;
    this.orderQuestions = orderQuestions;
    this.textQuestions = textQuestions;
  }

  setToDefault() {
    this.id = 0;
    this.name = '';
    this.singleChoiceQuestions = [];
    this.multipleChoiceQuestions = [];
    this.orderQuestions = [];
    this.textQuestions = [];
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitTestQL(this);
  }
}
