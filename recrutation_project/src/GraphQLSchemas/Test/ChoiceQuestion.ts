import { Field, InterfaceType } from '@nestjs/graphql';
import { Question } from './Question';
import { ChoiceAnswer } from './ChoiceAnswer';
import { Visitor } from '../../Abstracts/Visitor';

@InterfaceType({ implements: Question })
export abstract class ChoiceQuestion implements Question {
  id: number;
  content: string;
  @Field(() => [ChoiceAnswer])
  choiceAnswers: ChoiceAnswer[];

  protected constructor(
    id?: number,
    content?: string,
    choiceAnswers?: ChoiceAnswer[],
  ) {
    this.id = id;
    this.content = content;
    this.choiceAnswers = choiceAnswers;
  }

  abstract accept(visitor: Visitor): void;
}
