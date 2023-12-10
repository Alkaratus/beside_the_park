import { AbstractVisitor } from './Abstract.Visitor';

export abstract class AbstractOrderAnswer {
  content: string;
  order: number;
  abstract accept(visitor: AbstractVisitor);
}
