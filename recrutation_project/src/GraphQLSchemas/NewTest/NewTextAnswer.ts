import {Field, InputType} from "@nestjs/graphql";


@InputType()
export class NewTextAnswer{
    @Field()
    correct:string
}