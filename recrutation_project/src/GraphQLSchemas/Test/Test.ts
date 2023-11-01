import {Field, Int, ObjectType} from "@nestjs/graphql";
import {SingleChoiceQuestion} from "./SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "./MultipleChoiceQuestion";
import {OrderQuestion} from "./OrderQuestion";
import {TextQuestion} from "./TextQuestion";


@ObjectType()
export class Test{
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
}