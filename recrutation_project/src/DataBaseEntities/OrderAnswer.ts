import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderQuestion } from './OrderQuestion';
import { OrderAnswer as AbstractOrderAnswer } from '../Abstracts/OrderAnswer';
import { Visitor } from '../Abstracts/Visitor';

@Entity()
export class OrderAnswer implements AbstractOrderAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  order: number;

  @ManyToOne(
    () => OrderQuestion,
    (orderQuestion: OrderQuestion) => orderQuestion.answers,
  )
  question: OrderQuestion;

  constructor(
    id?: number,
    content?: string,
    order?: number,
    question?: OrderQuestion,
  ) {
    this.id = id;
    this.content = content;
    this.order = order;
    this.question = question;
  }

  accept(visitor: Visitor) {
    visitor.visitOrderAnswerEntity(this);
  }
}
