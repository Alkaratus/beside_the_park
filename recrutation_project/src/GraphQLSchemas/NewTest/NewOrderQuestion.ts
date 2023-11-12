import {Field, InputType} from "@nestjs/graphql";
import {NewOrderAnswer} from "./NewOrderAnswer";
import {OrderQuestion as AbstractOrderQuestion} from "../../Abstracts/OrderQuestion";
import {Visitor} from "../../Abstracts/Visitor";

@InputType()
export class NewOrderQuestion implements AbstractOrderQuestion{
    @Field()
    content:string

    @Field(()=>[NewOrderAnswer])
    answers:NewOrderAnswer[]

    constructor(content?:string,answers?: NewOrderAnswer[]) {
        this.content=content;
        this.answers=answers;
    }

    accept(visitor: Visitor): void {
        visitor.visitNewOrderQuestion(this);
    }
}