import { Field, InputType, Int } from '@nestjs/graphql';
import { QuestionAnswerSingleChoice } from './QuestionAnswer.SingleChoice';
import { QuestionAnswerMultipleChoice } from './QuestionAnswer.MultipleChoice';
import { QuestionAnswerOrder } from './QuestionAnswer.Order';
import { QuestionAnswerText } from './QuestionAnswer.Text';

@InputType()
export class QuestionAnswerTestAnswers {
  @Field(() => Int)
  testID: number;
  @Field(() => [QuestionAnswerSingleChoice])
  singleChoiceQuestionsAnswers: QuestionAnswerSingleChoice[];
  @Field(() => [QuestionAnswerMultipleChoice])
  multipleChoiceQuestionsAnswers: QuestionAnswerMultipleChoice[];
  @Field(() => [QuestionAnswerOrder])
  orderQuestionsAnswers: QuestionAnswerOrder[];
  @Field(() => [QuestionAnswerText])
  textQuestionsAnswers: QuestionAnswerText[];
}
