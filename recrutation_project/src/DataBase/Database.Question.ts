import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractQuestion as AbstractQuestion } from '../Abstracts/Abstract.Question';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';

export abstract class DatabaseQuestion implements AbstractQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  protected constructor(id: number, content: string) {
    this.id = id;
    this.content = content;
  }

  abstract accept(visitor: AbstractVisitor): void;
}
