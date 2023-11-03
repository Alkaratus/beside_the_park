import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {Test} from "./Test";
import {ChoiceAnswer} from "./ChoiceAnswer";
import {Question} from "./Question";
import {ChoiceQuestion as AbstractChoiceQuestion} from "../Abstracts/ChoiceQuestion";
import {Visitor} from "../Abstracts/Visitor";


@Entity()
export abstract class ChoiceQuestion extends Question implements AbstractChoiceQuestion{

    @Column()
    multiple: boolean

    @ManyToOne(()=>Test,(test)=>test.choiceQuestions)
    test: Test

    @OneToMany(()=>ChoiceAnswer, (choiceAnswer)=>choiceAnswer.question,
        {
            cascade:["insert"]
        })
    answers: ChoiceAnswer[]

    abstract accept(visitor: Visitor):void;
}