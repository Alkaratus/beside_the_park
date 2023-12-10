import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseChoiceQuestion } from './Database.ChoiceQuestion';
import { AbstractChoiceAnswer as AbstractChoiceAnswer } from '../Abstracts/Abstract.ChoiceAnswer';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';

@Entity()
export class DatabaseChoiceAnswer implements AbstractChoiceAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  correct: boolean;

  @ManyToOne(
    () => DatabaseChoiceQuestion,
    (choiceQuestion: DatabaseChoiceQuestion) => choiceQuestion.answers,
  )
  question: DatabaseChoiceQuestion;

  constructor(
    id?: number,
    content?: string,
    correct?: boolean,
    question?: DatabaseChoiceQuestion,
  ) {
    this.id = id;
    this.content = content;
    this.correct = correct;
    this.question = question;
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitChoiceAnswerEntity(this);
  }
}
