import {Field, Int, ObjectType} from "@nestjs/graphql";
import {SingleChoiceQuestion} from "./SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "./MultipleChoiceQuestion";
import {OrderQuestion} from "./OrderQuestion";
import {TextQuestion} from "./TextQuestion";
import {Test as AbstractTest} from "../../Abstracts/Test"
import {Visitor} from "../../Abstracts/Visitor";

@ObjectType()
export class Test implements AbstractTest{
    @Field(()=>Int)
    id:number

    @Field()
    name:string

    @Field(()=>[SingleChoiceQuestion])
    singleChoiceQuestions:SingleChoiceQuestion[]

    @Field(()=>[MultipleChoiceQuestion])
    multipleChoiceQuestions:MultipleChoiceQuestion[]

    @Field(()=>[OrderQuestion])
    orderQuestions:OrderQuestion[]

    @Field(()=>[TextQuestion])
    textQuestions:TextQuestion[]

    accept(visitor:Visitor){
        visitor.visit(this);
    }
}