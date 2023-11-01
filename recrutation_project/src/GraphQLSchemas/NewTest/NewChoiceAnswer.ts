import {Field, InputType} from "@nestjs/graphql";


@InputType()
export class NewChoiceAnswer{
    @Field()
    content:string

    @Field()
    correct:boolean
}