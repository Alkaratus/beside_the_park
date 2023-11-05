import {Field, InputType} from "@nestjs/graphql";
import {NewChoiceAnswer} from "./NewChoiceAnswer";
import {SingleChoiceQuestion as AbstractSingleChoiceQuestion} from "../../Abstracts/SingleChoiceQuestion";
import {Visitor} from "../../Abstracts/Visitor";

@InputType()
export class NewSingleChoiceQuestion implements AbstractSingleChoiceQuestion{
    @Field()
    content:string

    @Field(()=>[NewChoiceAnswer])
    answers: NewChoiceAnswer[]

    accept(visitor:Visitor):void{
        visitor.visit(this)
    }
}