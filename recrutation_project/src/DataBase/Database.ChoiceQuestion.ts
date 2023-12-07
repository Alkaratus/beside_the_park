import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DatabaseTest } from './Database.Test';
import { DatabaseChoiceAnswer } from './Database.ChoiceAnswer';
import { DatabaseQuestion } from './Database.Question';
import { AbstractChoiceQuestion as AbstractChoiceQuestion } from '../Abstracts/Abstract.ChoiceQuestion';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';

@Entity()
export abstract class DatabaseChoiceQuestion
  extends DatabaseQuestion
  implements AbstractChoiceQuestion
{
  @Column()
  multiple: boolean;

  @ManyToOne(() => DatabaseTest, (test) => test.choiceQuestions)
  test: DatabaseTest;

  @OneToMany(() => DatabaseChoiceAnswer, (choiceAnswer) => choiceAnswer.question, {
    cascade: ['insert'],
  })
  answers: DatabaseChoiceAnswer[];

  protected constructor(id: number, content: string, answers: DatabaseChoiceAnswer[]) {
    super(id, content);
    this.answers = answers;
  }

  abstract accept(visitor: AbstractVisitor): void;
}
