import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Test } from './Test';
import { OrderAnswer } from './OrderAnswer';
import { Question } from './Question';
import { OrderQuestion as AbstractOrderQuestion } from '../Abstracts/OrderQuestion';
import { Visitor } from '../Abstracts/Visitor';

@Entity()
export class OrderQuestion extends Question implements AbstractOrderQuestion {
  @ManyToOne(() => Test, (test: Test) => test.orderQuestions)
  test: Test;

  @OneToMany(
    () => OrderAnswer,
    (orderAnswer: OrderAnswer) => orderAnswer.question,
    {
      cascade: ['insert'],
    },
  )
  answers: OrderAnswer[];

  constructor(id?: number, content?: string, answers?: OrderAnswer[]) {
    super(id, content);
    this.answers = answers;
  }

  accept(visitor: Visitor): void {
    visitor.visitOrderQuestionEntity(this);
  }
}
