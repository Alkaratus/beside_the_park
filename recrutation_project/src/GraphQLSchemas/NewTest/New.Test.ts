import { Field, InputType } from '@nestjs/graphql';
import { NewSingleChoiceQuestion } from './New.SingleChoiceQuestion';
import { NewMultipleChoiceQuestion } from './New.MultipleChoiceQuestion';
import { NewOrderQuestion } from './New.OrderQuestion';
import { NewTextQuestion } from './New.TextQuestion';

@InputType()
export class NewTest {
  @Field()
  name: string;

  @Field(() => [NewSingleChoiceQuestion])
  singleChoiceQuestions: NewSingleChoiceQuestion[];

  @Field(() => [NewMultipleChoiceQuestion])
  multipleChoiceQuestions: NewMultipleChoiceQuestion[];

  @Field(() => [NewOrderQuestion])
  orderQuestions: NewOrderQuestion[];

  @Field(() => [NewTextQuestion])
  textQuestions: NewTextQuestion[];

  constructor(
    name: string = '',
    singleChoiceQuestions?: NewSingleChoiceQuestion[],
    multipleChoiceQuestions?: NewMultipleChoiceQuestion[],
    orderQuestions?: NewOrderQuestion[],
    textQuestions?: NewTextQuestion[],
  ) {
    this.setToDefault();
    this.name = name;
    this.singleChoiceQuestions = singleChoiceQuestions;
    this.multipleChoiceQuestions = multipleChoiceQuestions;
    this.orderQuestions = orderQuestions;
    this.textQuestions = textQuestions;
  }

  setToDefault() {
    this.name = '';
    this.singleChoiceQuestions = [];
    this.multipleChoiceQuestions = [];
    this.orderQuestions = [];
    this.textQuestions = [];
  }
}
