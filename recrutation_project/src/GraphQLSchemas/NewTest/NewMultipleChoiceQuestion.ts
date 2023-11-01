import {Field, InputType} from "@nestjs/graphql";
import {NewChoiceAnswer} from "./NewChoiceAnswer";


@InputType()
export class NewMultipleChoiceQuestion{
    @Field()
    content:string

    @Field(()=>[NewChoiceAnswer])
    answers: NewChoiceAnswer[]
}