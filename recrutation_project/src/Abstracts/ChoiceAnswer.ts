import { Visitor } from './Visitor';

export abstract class ChoiceAnswer {
  content: string;
  correct: boolean;
  abstract accept(visitor: Visitor);
}
