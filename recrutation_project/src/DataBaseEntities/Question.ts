import {Column, PrimaryGeneratedColumn} from "typeorm";
import {Question as AbstractQuestion} from "../Abstracts/Question";
import {Visitor} from "../Abstracts/Visitor";


export abstract class Question implements AbstractQuestion{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    abstract accept(visitor: Visitor):void;
}