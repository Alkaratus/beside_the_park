import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { DatabaseTest } from './Database.Test';
import { DatabaseOrderAnswer } from './Database.OrderAnswer';
import { DatabaseQuestion } from './Database.Question';
import { AbstractOrderQuestion as AbstractOrderQuestion } from '../Abstracts/Abstract.OrderQuestion';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';

@Entity()
export class DatabaseOrderQuestion extends DatabaseQuestion implements AbstractOrderQuestion {
  @ManyToOne(() => DatabaseTest, (test: DatabaseTest) => test.orderQuestions)
  test: DatabaseTest;

  @OneToMany(
    () => DatabaseOrderAnswer,
    (orderAnswer: DatabaseOrderAnswer) => orderAnswer.question,
    {
      cascade: ['insert'],
    },
  )
  answers: DatabaseOrderAnswer[];

  constructor(id?: number, content?: string, answers?: DatabaseOrderAnswer[]) {
    super(id, content);
    this.answers = answers;
  }

  accept(visitor: AbstractVisitor): void {
    visitor.visitOrderQuestionEntity(this);
  }
}
