import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AbstractOrderAnswer as AbstractOrderAnswer } from '../../Abstracts/Abstract.OrderAnswer';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@ObjectType()
export class TestOrderAnswer implements AbstractOrderAnswer {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => Int)
  order: number;

  constructor(id?: number, content?: string, order?: number) {
    this.id = id;
    this.content = content;
    this.order = order;
  }

  accept(visitor: AbstractVisitor) {
    visitor.visitOrderAnswerQL(this);
  }
}
