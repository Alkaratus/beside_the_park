import { ChildEntity } from 'typeorm';
import { DatabaseChoiceQuestion } from './Database.ChoiceQuestion';
import { AbstractMultipleChoiceQuestion as AbstractMultipleChoiceQuestion } from '../Abstracts/Abstract.MultipleChoiceQuestion';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';
import { DatabaseChoiceAnswer } from './Database.ChoiceAnswer';

@ChildEntity()
export class DatabaseMultipleChoiceQuestion
  extends DatabaseChoiceQuestion
  implements AbstractMultipleChoiceQuestion
{
  readonly multiple = true;

  constructor(id?: number, content?: string, answers?: DatabaseChoiceAnswer[]) {
    super(id, content, answers);
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitMultipleChoiceQuestionEntity(this);
  }
}
