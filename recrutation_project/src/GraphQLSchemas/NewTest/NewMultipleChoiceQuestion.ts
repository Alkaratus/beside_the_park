import {Field, InputType} from "@nestjs/graphql";
import {NewChoiceAnswer} from "../../graphql";

@InputType()
export class NewMultipleChoiceQuestion{
    @Field()
    content:string

    @Field(()=>[NewChoiceAnswer])
    answers: NewChoiceAnswer[]
}