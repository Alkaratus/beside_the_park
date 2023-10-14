import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TextAnswer} from "./TextAnswer";


@Entity()
export class TextQuestion{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @OneToMany(()=>TextAnswer,(textAnswer:TextAnswer)=>textAnswer.question)
    answers: TextAnswer[]
}