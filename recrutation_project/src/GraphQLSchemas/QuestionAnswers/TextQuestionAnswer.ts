import {Field, InputType, Int} from "@nestjs/graphql";


@InputType()
export class TextQuestionAnswer{
    @Field(()=>Int)
    questionID: number

    @Field()
    answer: string
}