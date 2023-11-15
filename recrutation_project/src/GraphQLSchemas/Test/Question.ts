import {Field, Int, InterfaceType} from "@nestjs/graphql";
import {Question as AbstractQuestion} from "../../Abstracts/Question";
import {Visitor} from "../../Abstracts/Visitor";

@InterfaceType()
export abstract class Question implements AbstractQuestion{
    @Field(()=>Int)
    id:number

    @Field()
    content:string

    abstract accept(visitor: Visitor):void;
}


