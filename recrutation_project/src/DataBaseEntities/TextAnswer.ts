import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TextQuestion} from "./TextQuestion";
import {Visitor} from "../Abstracts/Visitor";
import {TextAnswer as AbstractTextAnswer} from "../Abstracts/TextAnswer";

@Entity()
export class TextAnswer implements AbstractTextAnswer{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    correct: string

    @ManyToOne(()=>TextQuestion,(textQuestion:TextQuestion)=>textQuestion.answers)
    question: TextQuestion

    constructor(id?: number,correct?: string,question?: TextQuestion) {
        this.id=id;
        this.correct=correct;
        this.question=question;
    }

    accept(visitor: Visitor) {
        visitor.visit(this);
    }
}