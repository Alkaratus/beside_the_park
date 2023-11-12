import {Field, Int, ObjectType} from "@nestjs/graphql";
import {ChoiceAnswer as AbstractChoiceAnswer} from "../../Abstracts/ChoiceAnswer";
import {Visitor} from "../../Abstracts/Visitor";

@ObjectType()
export class ChoiceAnswer implements AbstractChoiceAnswer{
    @Field(()=>Int)
    id:number

    @Field()
    content:string

    @Field()
    correct:boolean

    constructor(id?:number,content?:string,correct?:boolean){
        this.id=id;
        this.content=content;
        this.correct=correct;
    }

    accept(visitor: Visitor) {
        visitor.visitChoiceAnswerQL(this)
    }
}