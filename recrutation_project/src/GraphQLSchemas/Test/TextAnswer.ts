import {Field, Int, ObjectType} from "@nestjs/graphql";
import {TextAnswer as AbstractTextAnswer} from "../../Abstracts/TextAnswer";
import {Visitor} from "../../Abstracts/Visitor";

@ObjectType()
export class TextAnswer implements AbstractTextAnswer{
    @Field(()=>Int)
    id:number

    @Field()
    correct:string

    constructor(id?: number,correct?: string) {
        this.id=id;
        this.correct=correct;
    }

    accept(visitor: Visitor) {
        visitor.visitTextAnswerQL(this)
    }

}