import {Field, InputType, Int} from "@nestjs/graphql";


@InputType()
export class NewOrderAnswer{
    @Field()
    content:string

    @Field(()=>Int)
    order:number
}