import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Question as AbstractQuestion } from '../Abstracts/Question';
import { Visitor } from '../Abstracts/Visitor';

export abstract class Question implements AbstractQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  protected constructor(id: number, content: string) {
    this.id = id;
    this.content = content;
  }

  abstract accept(visitor: Visitor): void;
}
