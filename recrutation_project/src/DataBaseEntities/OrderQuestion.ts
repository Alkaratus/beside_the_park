import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Test} from "./Test";
import {OrderAnswer} from "./OrderAnswer";

@Entity()
export class OrderQuestion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(()=>Test,(test:Test)=>test.orderQuestions)
    test:Test;

    @OneToMany(()=>OrderAnswer,(orderAnswer:OrderAnswer)=>orderAnswer.question,
        {
            cascade:["insert"]
        })
    answers:OrderAnswer[]
}