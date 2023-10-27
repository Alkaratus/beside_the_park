import {Column, PrimaryGeneratedColumn} from "typeorm";


export abstract class Question{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string
}