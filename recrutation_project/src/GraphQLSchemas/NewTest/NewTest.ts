import { Field, InputType } from '@nestjs/graphql';
import { NewSingleChoiceQuestion } from './NewSingleChoiceQuestion';
import { NewMultipleChoiceQuestion } from './NewMultipleChoiceQuestion';
import { NewOrderQuestion } from './NewOrderQuestion';
import { NewTextQuestion } from './NewTextQuestion';

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
