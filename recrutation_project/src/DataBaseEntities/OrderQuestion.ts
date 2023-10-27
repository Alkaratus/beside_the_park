import {Entity, ManyToOne, OneToMany} from "typeorm";
import {Test} from "./Test";
import {OrderAnswer} from "./OrderAnswer";
import {Question} from "./Question";

@Entity()
export class OrderQuestion extends Question{

    @ManyToOne(()=>Test,(test:Test)=>test.orderQuestions)
    test:Test;

    @OneToMany(()=>OrderAnswer,(orderAnswer:OrderAnswer)=>orderAnswer.question,
        {
            cascade:["insert"]
        })
    answers:OrderAnswer[]
}