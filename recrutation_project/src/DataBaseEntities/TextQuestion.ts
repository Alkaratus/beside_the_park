import {Entity, ManyToOne, OneToMany} from "typeorm";
import {TextAnswer} from "./TextAnswer";
import {Test} from "./Test";
import {Question} from "./Question";


@Entity()
export class TextQuestion extends Question{

    @ManyToOne(()=>Test, (test:Test)=>test.textQuestions)
    test:Test

    @OneToMany(()=>TextAnswer,(textAnswer:TextAnswer)=>textAnswer.question,
        {
            cascade:["insert"]
        })
    answers: TextAnswer[]
}