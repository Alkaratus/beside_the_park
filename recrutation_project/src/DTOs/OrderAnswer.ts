import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {OrderQuestion} from "./OrderQuestion";


export class OrderAnswer{
    content: string
    order: number
}