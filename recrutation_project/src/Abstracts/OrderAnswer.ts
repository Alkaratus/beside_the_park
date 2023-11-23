import { Visitor } from './Visitor';

export abstract class OrderAnswer {
  content: string;
  order: number;
  abstract accept(visitor: Visitor);
}
