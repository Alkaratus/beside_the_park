import {Field, Int, ObjectType} from "@nestjs/graphql";


@ObjectType()
export class TextAnswer{
    @Field(()=>Int)
    id:number

    @Field()
    correct:string
}