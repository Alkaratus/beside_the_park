import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { TextAnswer } from './TextAnswer';
import { Test } from './Test';
import { Question } from './Question';
import { TextQuestion as AbstractTextQuestion } from '../Abstracts/TextQuestion';
import { Visitor } from '../Abstracts/Visitor';

@Entity()
export class TextQuestion extends Question implements AbstractTextQuestion {
  @ManyToOne(() => Test, (test: Test) => test.textQuestions)
  test: Test;

  @OneToMany(
    () => TextAnswer,
    (textAnswer: TextAnswer) => textAnswer.question,
    {
      cascade: ['insert'],
    },
  )
  answers: TextAnswer[];

  constructor(id?: number, content?: string, answers?: TextAnswer[]) {
    super(id, content);
    this.answers = answers;
  }

  accept(visitor: Visitor) {
    visitor.visitTextQuestionEntity(this);
  }
}
