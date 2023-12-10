import { AbstractVisitor } from './Abstract.Visitor';

export abstract class AbstractTextAnswer {
  correct: string;

  abstract accept(visitor: AbstractVisitor): void;
}
