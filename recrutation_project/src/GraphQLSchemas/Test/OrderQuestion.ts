import {Field, ObjectType} from "@nestjs/graphql";
import {Question} from "./Question";
import {OrderAnswer} from "./OrderAnswer";
import {OrderQuestion as AbstractOrderQuestion} from "../../Abstracts/OrderQuestion";
import {Visitor} from "../../Abstracts/Visitor";

@ObjectType({implements:Question})
export class OrderQuestion implements Question, AbstractOrderQuestion{
    id: number;
    content: string;
    @Field(()=>[OrderAnswer])
    orderAnswers: OrderAnswer[]

    accept(visitor: Visitor): void {
        visitor.visitOrderQuestionQL(this);
    }

}