import {Field, InputType} from "@nestjs/graphql";
import {ChoiceAnswer as AbstractChoiceAnswer} from "../../Abstracts/ChoiceAnswer";
import {Visitor} from "../../Abstracts/Visitor";

@InputType()
export class NewChoiceAnswer implements AbstractChoiceAnswer{
    @Field()
    content:string

    @Field()
    correct:boolean

    accept(visitor: Visitor) {
        visitor.visit(this)
    }
}