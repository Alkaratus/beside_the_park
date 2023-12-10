import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AbstractChoiceAnswer as AbstractChoiceAnswer } from '../../Abstracts/Abstract.ChoiceAnswer';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@ObjectType()
export class TestChoiceAnswer implements AbstractChoiceAnswer {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  correct: boolean;

  constructor(id?: number, content?: string, correct?: boolean) {
    this.id = id;
    this.content = content;
    this.correct = correct;
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitChoiceAnswerQL(this);
  }
}
