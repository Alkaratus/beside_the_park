import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AbstractTextAnswer as AbstractTextAnswer } from '../../Abstracts/Abstract.TextAnswer';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@ObjectType()
export class TextAnswer implements AbstractTextAnswer {
  @Field(() => Int)
  id: number;

  @Field()
  correct: string;

  constructor(id?: number, correct?: string) {
    this.id = id;
    this.correct = correct;
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitTextAnswerQL(this);
  }
}
