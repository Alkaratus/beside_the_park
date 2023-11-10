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

    constructor(content?:string,answers?:NewChoiceAnswer[]) {
        this.content=content;
        this.answers=answers;
    }

    accept(visitor:Visitor):void{
        visitor.visitNewSingleChoiceQuestion(this)
    }
}