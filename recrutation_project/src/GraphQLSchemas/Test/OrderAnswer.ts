import {Field, Int, ObjectType} from "@nestjs/graphql";
import {OrderAnswer as AbstractOrderAnswer} from "../../Abstracts/OrderAnswer";
import {Visitor} from "../../Abstracts/Visitor";

@ObjectType()
export class OrderAnswer implements AbstractOrderAnswer{
    @Field(()=>Int)
    id:number

    @Field()
    content:string

    @Field(()=>Int)
    order:number

    constructor(id?: number,content?: string,order?: number){
        this.id=id;
        this.content=content;
        this.order=order;
    }

    accept(visitor: Visitor){
        visitor.visitOrderAnswerQL(this)
    }

}