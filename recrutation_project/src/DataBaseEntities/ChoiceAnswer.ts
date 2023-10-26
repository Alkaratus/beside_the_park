import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";


@Entity()
export class ChoiceAnswer{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    correct: boolean

    @ManyToOne(()=>ChoiceQuestion, (choiceQuestion:ChoiceQuestion)=>choiceQuestion.answers)
    question:ChoiceQuestion
}