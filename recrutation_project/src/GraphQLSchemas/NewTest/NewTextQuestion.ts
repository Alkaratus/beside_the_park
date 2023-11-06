import {Field, InputType} from "@nestjs/graphql";
import {NewTextAnswer} from "./NewTextAnswer";
import {Visitor} from "../../Abstracts/Visitor";

@InputType()
export class NewTextQuestion{
    @Field()
    content:string

    @Field(()=>[NewTextAnswer])
    answers:NewTextAnswer[]

    accept(visitor: Visitor): void {
        visitor.visitNewTextQuestion(this)
    }
}