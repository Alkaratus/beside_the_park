import { Visitor } from './Visitor';

export abstract class Question {
  content: string;
  abstract accept(visitor: Visitor): void;
}
