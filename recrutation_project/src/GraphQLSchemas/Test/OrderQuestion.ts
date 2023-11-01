import {Field, ObjectType} from "@nestjs/graphql";
import {Question} from "./Question";
import {OrderAnswer} from "./OrderAnswer";

@ObjectType({implements:Question})
export class OrderQuestion implements Question{
    id: number;
    content: string;
    @Field(()=>[OrderAnswer])
    orderAnswers: OrderAnswer[]
}