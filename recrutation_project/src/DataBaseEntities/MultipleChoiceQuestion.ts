import { ChildEntity } from 'typeorm';
import { ChoiceQuestion } from './ChoiceQuestion';
import { MultipleChoiceQuestion as AbstractMultipleChoiceQuestion } from '../Abstracts/MultipleChoiceQuestion';
import { Visitor } from '../Abstracts/Visitor';
import { ChoiceAnswer } from './ChoiceAnswer';

@ChildEntity()
export class MultipleChoiceQuestion
  extends ChoiceQuestion
  implements AbstractMultipleChoiceQuestion
{
  readonly multiple = true;

  constructor(id?: number, content?: string, answers?: ChoiceAnswer[]) {
    super(id, content, answers);
  }

  accept(visitor: Visitor) {
    visitor.visitMultipleChoiceQuestionEntity(this);
  }
}
