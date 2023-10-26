import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TextQuestion} from "./TextQuestion";

@Entity()
export class TextAnswer{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    correct: string

    @ManyToOne(()=>TextQuestion,(textQuestion:TextQuestion)=>textQuestion.answers)
    question: TextQuestion
}