import { Visitor } from './Visitor';

export abstract class TextAnswer {
  correct: string;

  abstract accept(visitor: Visitor);
}
