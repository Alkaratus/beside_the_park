import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseTextQuestion } from './Database.TextQuestion';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';
import { AbstractTextAnswer as AbstractTextAnswer } from '../Abstracts/Abstract.TextAnswer';

@Entity()
export class DatabaseTextAnswer implements AbstractTextAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  correct: string;

  @ManyToOne(
    () => DatabaseTextQuestion,
    (textQuestion: DatabaseTextQuestion) => textQuestion.answers,
  )
  question: DatabaseTextQuestion;

  constructor(id?: number, correct?: string, question?: DatabaseTextQuestion) {
    this.id = id;
    this.correct = correct;
    this.question = question;
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitTextAnswerEntity(this);
  }
}
