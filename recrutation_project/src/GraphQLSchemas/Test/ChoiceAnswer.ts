import {Field, Int, ObjectType} from "@nestjs/graphql";


@ObjectType()
export class ChoiceAnswer{
    @Field(()=>Int)
    id:number

    @Field()
    content:string

    @Field()
    correct:boolean
}