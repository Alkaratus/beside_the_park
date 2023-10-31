import {QuestionResult} from "./QuestionResult";
import {Field, Int, ObjectType} from "@nestjs/graphql";


@ObjectType({implements:QuestionResult})
export class TextQuestionResult implements QuestionResult{
    questionID: number;
    correct: boolean;

    @Field(()=>[Int],{nullable:true})
    correctAnswersIDs: number[]
}