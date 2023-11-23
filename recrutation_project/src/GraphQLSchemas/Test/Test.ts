import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OrderQuestion } from './OrderQuestion';
import { TextQuestion } from './TextQuestion';
import { Test as AbstractTest } from '../../Abstracts/Test';
import { Visitor } from '../../Abstracts/Visitor';

@ObjectType()
export class Test implements AbstractTest {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [SingleChoiceQuestion])
  singleChoiceQuestions: SingleChoiceQuestion[];

  @Field(() => [MultipleChoiceQuestion])
  multipleChoiceQuestions: MultipleChoiceQuestion[];

  @Field(() => [OrderQuestion])
  orderQuestions: OrderQuestion[];

  @Field(() => [TextQuestion])
  textQuestions: TextQuestion[];

  constructor(
    id: number = 0,
    name: string = '',
    singleChoiceQuestions?: SingleChoiceQuestion[],
    multipleChoiceQuestions?: MultipleChoiceQuestion[],
    orderQuestions?: OrderQuestion[],
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

  accept(visitor: Visitor) {
    visitor.visitTestQL(this);
  }
}
