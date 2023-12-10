import { ChildEntity } from 'typeorm';
import { DatabaseChoiceQuestion } from './Database.ChoiceQuestion';
import { AbstractSingleChoiceQuestion } from '../Abstracts/Abstract.SingleChoiceQuestion';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';
import { DatabaseChoiceAnswer } from './Database.ChoiceAnswer';

@ChildEntity()
export class DatabaseSingleChoiceQuestion
  extends DatabaseChoiceQuestion
  implements AbstractSingleChoiceQuestion
{
  readonly multiple = false;

  constructor(id?: number, content?: string, answers?: DatabaseChoiceAnswer[]) {
    super(id, content, answers);
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitSingleChoiceQuestionEntity(this);
  }
}
