import { Field, Int, InterfaceType } from '@nestjs/graphql';
import { AbstractQuestion as AbstractQuestion } from '../../Abstracts/Abstract.Question';
import { AbstractVisitor } from '../../Abstracts/Abstract.Visitor';

@InterfaceType()
export abstract class TestQuestion implements AbstractQuestion {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  abstract accept(visitor: AbstractVisitor): void;
}
