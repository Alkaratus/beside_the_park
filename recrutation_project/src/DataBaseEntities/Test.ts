import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {OrderQuestion} from "./OrderQuestion";
import {TextQuestion} from "./TextQuestion";


@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToMany(()=>ChoiceQuestion, (choiceQuestion)=>choiceQuestion.test)
    choiceQuestions: ChoiceQuestion[]

    @OneToMany(()=>OrderQuestion, (orderQuestion)=>orderQuestion.test)
    orderQuestions: OrderQuestion[]

    @OneToMany(()=>TextQuestion,(textQuestion:TextQuestion)=>textQuestion.test)
    textQuestions: TextQuestion[]
}