import { Visitor } from './Visitor';

export abstract class Test {
  name: string;
  abstract accept(visitor: Visitor);
}
