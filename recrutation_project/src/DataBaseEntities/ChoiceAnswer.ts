import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {ChoiceAnswer as AbstractChoiceAnswer} from "../Abstracts/ChoiceAnswer";
import {Visitor} from "../Abstracts/Visitor";


@Entity()
export class ChoiceAnswer implements AbstractChoiceAnswer{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    correct: boolean

    @ManyToOne(()=>ChoiceQuestion, (choiceQuestion:ChoiceQuestion)=>choiceQuestion.answers)
    question:ChoiceQuestion

    constructor(id?:number,content?:string,correct?:boolean, question?:ChoiceQuestion){
        this.id=id;
        this.content=content;
        this.correct=correct;
        this.question=question;
    }

    accept(visitor:Visitor){
        visitor.visit(this)
    }

}