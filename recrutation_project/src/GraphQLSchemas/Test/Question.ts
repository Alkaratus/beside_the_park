import {Field, Int, InterfaceType} from "@nestjs/graphql";


@InterfaceType()
export abstract class Question{
    @Field(()=>Int)
    id:number

    @Field()
    content:string
}