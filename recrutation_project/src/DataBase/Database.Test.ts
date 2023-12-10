import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseChoiceQuestion } from './Database.ChoiceQuestion';
import { DatabaseOrderQuestion } from './Database.OrderQuestion';
import { DatabaseTextQuestion } from './Database.TextQuestion';
import { AbstractTest as AbstractTest } from '../Abstracts/Abstract.Test';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';

@Entity()
export class DatabaseTest implements AbstractTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => DatabaseChoiceQuestion, (choiceQuestion) => choiceQuestion.test, {
    cascade: ['insert'],
  })
  choiceQuestions: DatabaseChoiceQuestion[];

  @OneToMany(() => DatabaseOrderQuestion, (orderQuestion) => orderQuestion.test, {
    cascade: ['insert'],
  })
  orderQuestions: DatabaseOrderQuestion[];

  @OneToMany(
    () => DatabaseTextQuestion,
    (textQuestion: DatabaseTextQuestion) => textQuestion.test,
    {
      cascade: ['insert'],
    },
  )
  textQuestions: DatabaseTextQuestion[];

  constructor(
    id: number = 0,
    name: string = '',
    choiceQuestions?: DatabaseChoiceQuestion[],
    orderQuestions?: DatabaseOrderQuestion[],
    textQuestions?: DatabaseTextQuestion[],
  ) {
    this.id = id;
    this.name = name;
    this.choiceQuestions = choiceQuestions;
    this.orderQuestions = orderQuestions;
    this.textQuestions = textQuestions;
  }

  setToDefault(): void {
    this.id = 0;
    this.name = '';
    this.choiceQuestions = [];
    this.orderQuestions = [];
    this.textQuestions = [];
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitTestEntity(this);
  }
}
