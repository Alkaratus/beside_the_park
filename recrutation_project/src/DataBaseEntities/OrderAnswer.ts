import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {OrderQuestion} from "./OrderQuestion";


@Entity()
export class OrderAnswer{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    order: number

    @ManyToOne(()=>OrderQuestion,(orderQuestion:OrderQuestion)=>orderQuestion.answers)
    question:OrderQuestion


}