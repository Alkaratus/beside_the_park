import {Field, Int, ObjectType} from "@nestjs/graphql";
import {QuestionResult} from "./QuestionResult";


@ObjectType({implements:QuestionResult})
export class MultipleChoiceQuestionResult{
    questionID: number;
    correct: boolean;

    @Field(()=>[Int],{nullable:true})
    correctAnswersIDs: number[]
}