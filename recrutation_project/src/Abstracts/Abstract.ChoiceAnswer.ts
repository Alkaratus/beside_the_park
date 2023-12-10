import { AbstractVisitor } from './Abstract.Visitor';

export abstract class AbstractChoiceAnswer {
  content: string;
  correct: boolean;
  abstract accept(visitor: AbstractVisitor);
}
