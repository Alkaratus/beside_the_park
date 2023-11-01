import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {Test} from "./Test";
import {ChoiceAnswer} from "./ChoiceAnswer";
import {Question} from "./Question";

@Entity()
export abstract class ChoiceQuestion extends Question{

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