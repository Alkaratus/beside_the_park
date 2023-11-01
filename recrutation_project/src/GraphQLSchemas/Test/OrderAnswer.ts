import {Field, Int, ObjectType} from "@nestjs/graphql";


@ObjectType()
export class OrderAnswer{
    @Field(()=>Int)
    id:number

    @Field()
    content:string

    @Field(()=>Int)
    order:number
}