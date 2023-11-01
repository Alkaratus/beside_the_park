import {Field, Int, ObjectType} from "@nestjs/graphql";
import {QuestionResult} from "./QuestionResult";


@ObjectType({implements:QuestionResult})
export class SingleChoiceQuestionResult implements QuestionResult{
    questionID: number;
    correct: boolean;

    @Field(()=>Int,{nullable:true})
    correctAnswerID: number
}