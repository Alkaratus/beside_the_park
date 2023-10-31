import {Field, Int, ObjectType} from "@nestjs/graphql";


@ObjectType()
export abstract class Question{
    @Field(()=>Int)
    id:number

    @Field()
    content:string
}