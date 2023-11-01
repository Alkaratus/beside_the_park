import {Field, InputType} from "@nestjs/graphql";
import {NewChoiceAnswer} from "./NewChoiceAnswer";


@InputType()
export class NewSingleChoiceQuestion{
    @Field()
    content:string

    @Field(()=>[NewChoiceAnswer])
    answers: NewChoiceAnswer[]
}