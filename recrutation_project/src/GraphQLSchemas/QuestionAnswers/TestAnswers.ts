import {Field, InputType, Int} from "@nestjs/graphql";
import {SingleChoiceQuestionAnswer} from "./SingleChoiceQuestionAnswer";
import {MultipleChoiceQuestionAnswer} from "./MultipleChoiceQuestionAnswer";
import {OrderQuestionAnswer} from "./OrderQuestionAnswer";
import {TextQuestionAnswer} from "./TextQuestionAnswer";


@InputType()
export class TestAnswers{
    @Field(()=>Int)
    testID: number
    @Field(()=>[SingleChoiceQuestionAnswer])
    singleChoiceQuestionsAnswers: SingleChoiceQuestionAnswer[]
    @Field(()=>[MultipleChoiceQuestionAnswer])
    multipleChoiceQuestionsAnswers: MultipleChoiceQuestionAnswer[]
    @Field(()=>[OrderQuestionAnswer])
    orderQuestionsAnswers: OrderQuestionAnswer[]
    @Field(()=>[TextQuestionAnswer])
    textQuestionsAnswers: TextQuestionAnswer[]
}