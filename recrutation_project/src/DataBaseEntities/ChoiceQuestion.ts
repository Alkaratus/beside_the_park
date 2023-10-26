import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {Test} from "./Test";
import {ChoiceAnswer} from "./ChoiceAnswer";

@Entity()
export class ChoiceQuestion {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    multiple: boolean

    @ManyToOne(()=>Test,(test)=>test.choiceQuestions)
    test: Test

    @OneToMany(()=>ChoiceAnswer, (choiceAnswer)=>choiceAnswer.question,
        {
            cascade:["insert"]
        })
    answers: ChoiceAnswer[]
}