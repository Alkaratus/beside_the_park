import { AbstractVisitor } from './Abstract.Visitor';

export abstract class AbstractQuestion {
  content: string;
  abstract accept(visitor: AbstractVisitor): void;
}
