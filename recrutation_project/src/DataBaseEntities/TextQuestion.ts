import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TextAnswer} from "./TextAnswer";
import {Test} from "./Test";


@Entity()
export class TextQuestion{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(()=>Test, (test:Test)=>test.textQuestions)
    test:Test

    @OneToMany(()=>TextAnswer,(textAnswer:TextAnswer)=>textAnswer.question)
    answers: TextAnswer[]
}