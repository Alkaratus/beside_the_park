import {Field, InputType} from "@nestjs/graphql";
import {NewChoiceAnswer} from "./NewChoiceAnswer";
import {MultipleChoiceQuestion as AbstractMultipleChoiceQuestion} from "../../Abstracts/MultipleChoiceQuestion";
import {Visitor} from "../../Abstracts/Visitor";

@InputType()
export class NewMultipleChoiceQuestion implements AbstractMultipleChoiceQuestion{
    @Field()
    content:string

    @Field(()=>[NewChoiceAnswer])
    answers: NewChoiceAnswer[]

    accept(visitor: Visitor){
        visitor.visitNewMultipleChoiceQuestion(this)
    }
}