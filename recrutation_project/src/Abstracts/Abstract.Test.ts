import { AbstractVisitor } from './Abstract.Visitor';

export abstract class AbstractTest {
  name: string;
  abstract accept(visitor: AbstractVisitor);
}
