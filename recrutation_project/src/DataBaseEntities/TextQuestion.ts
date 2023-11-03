import {Entity, ManyToOne, OneToMany} from "typeorm";
import {TextAnswer} from "./TextAnswer";
import {Test} from "./Test";
import {Question} from "./Question";
import {TextQuestion as AbstractTextQuestion} from "../Abstracts/TextQuestion";
import {Visitor} from "../Abstracts/Visitor";

@Entity()
export class TextQuestion extends Question implements AbstractTextQuestion{

    @ManyToOne(()=>Test, (test:Test)=>test.textQuestions)
    test:Test

    @OneToMany(()=>TextAnswer,(textAnswer:TextAnswer)=>textAnswer.question,
        {
            cascade:["insert"]
        })
    answers: TextAnswer[]

    accept(visitor: Visitor) {
        visitor.visit(this);
    }
}