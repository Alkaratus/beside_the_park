import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {OrderQuestion} from "./OrderQuestion";
import {TextQuestion} from "./TextQuestion";
import {Test as AbstractTest} from "../Abstracts/Test"
import {Visitor} from "../Abstracts/Visitor";

@Entity()
export class Test implements AbstractTest{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToMany(()=>ChoiceQuestion, (choiceQuestion)=>choiceQuestion.test,
        {
            cascade:["insert"]
        })
    choiceQuestions: ChoiceQuestion[]

    @OneToMany(()=>OrderQuestion, (orderQuestion)=>orderQuestion.test,
        {
            cascade:["insert"]
        })
    orderQuestions: OrderQuestion[]

    @OneToMany(()=>TextQuestion,(textQuestion:TextQuestion)=>textQuestion.test,
        {
            cascade:["insert"]
        })
    textQuestions: TextQuestion[]


    accept(visitor:Visitor){
        visitor.visitTestEntity(this);
    }
}