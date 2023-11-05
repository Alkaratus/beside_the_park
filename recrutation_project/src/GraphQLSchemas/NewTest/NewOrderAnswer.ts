import {Field, InputType, Int} from "@nestjs/graphql";
import {OrderAnswer as AbstractOrderAnswer} from "../../Abstracts/OrderAnswer";
import {Visitor} from "../../Abstracts/Visitor";

@InputType()
export class NewOrderAnswer implements AbstractOrderAnswer{
    @Field()
    content:string

    @Field(()=>Int)
    order:number

    accept(visitor: Visitor){
        visitor.visit(this)
    }
}