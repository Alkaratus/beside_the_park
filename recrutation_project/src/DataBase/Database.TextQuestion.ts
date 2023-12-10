import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { DatabaseTextAnswer } from './Database.TextAnswer';
import { DatabaseTest } from './Database.Test';
import { DatabaseQuestion } from './Database.Question';
import { AbstractTextQuestion as AbstractTextQuestion } from '../Abstracts/Abstract.TextQuestion';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';

@Entity()
export class DatabaseTextQuestion extends DatabaseQuestion implements AbstractTextQuestion {
  @ManyToOne(() => DatabaseTest, (test: DatabaseTest) => test.textQuestions)
  test: DatabaseTest;

  @OneToMany(
    () => DatabaseTextAnswer,
    (textAnswer: DatabaseTextAnswer) => textAnswer.question,
    {
      cascade: ['insert'],
    },
  )
  answers: DatabaseTextAnswer[];

  constructor(id?: number, content?: string, answers?: DatabaseTextAnswer[]) {
    super(id, content);
    this.answers = answers;
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitTextQuestionEntity(this);
  }
}
