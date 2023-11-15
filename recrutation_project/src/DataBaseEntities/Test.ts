import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {OrderQuestion} from "./OrderQuestion";
import {TextQuestion} from "./TextQuestion";
import {Test as AbstractTest} from "../Abstracts/Test"
import {Visitor} from "../Abstracts/Visitor";
//import {MultipleChoiceQuestion} from "./MultipleChoiceQuestion";
//import {SingleChoiceQuestion} from "./SingleChoiceQuestion";

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

    constructor(id:number=0,name:string="",choiceQuestions?:ChoiceQuestion[],orderQuestions?:OrderQuestion[],textQuestions?:TextQuestion[]){
        this.id=id;
        this.name=name;
        this.choiceQuestions=choiceQuestions
        this.orderQuestions=orderQuestions;
        this.textQuestions=textQuestions;
    }

    setToDefault():void{
        this.id=0;
        this.name="";
        this.choiceQuestions=[]
        this.orderQuestions=[];
        this.textQuestions=[];
    }

    accept(visitor:Visitor){
        visitor.visitTestEntity(this);
    }
}