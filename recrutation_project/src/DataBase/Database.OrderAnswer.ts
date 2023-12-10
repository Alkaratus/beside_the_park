import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseOrderQuestion } from './Database.OrderQuestion';
import { AbstractOrderAnswer as AbstractOrderAnswer } from '../Abstracts/Abstract.OrderAnswer';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';

@Entity()
export class DatabaseOrderAnswer implements AbstractOrderAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  order: number;

  @ManyToOne(
    () => DatabaseOrderQuestion,
    (orderQuestion: DatabaseOrderQuestion) => orderQuestion.answers,
  )
  question: DatabaseOrderQuestion;

  constructor(
    id?: number,
    content?: string,
    order?: number,
    question?: DatabaseOrderQuestion,
  ) {
    this.id = id;
    this.content = content;
    this.order = order;
    this.question = question;
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitOrderAnswerEntity(this);
  }
}
