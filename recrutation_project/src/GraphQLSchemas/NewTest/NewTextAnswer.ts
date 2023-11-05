import {Field, InputType} from "@nestjs/graphql";
import {TextAnswer as AbstractTextAnswer} from "../../Abstracts/TextAnswer";
import {Visitor} from "../../Abstracts/Visitor";

@InputType()
export class NewTextAnswer implements AbstractTextAnswer{
    @Field()
    correct:string

    accept(visitor: Visitor) {
        visitor.visit(this)
    }
}