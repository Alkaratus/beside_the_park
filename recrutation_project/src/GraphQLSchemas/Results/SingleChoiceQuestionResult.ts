import {Field, Int, ObjectType} from "@nestjs/graphql";
import {QuestionResult} from "./QuestionResult";


@ObjectType({implements:QuestionResult})
export class SingleChoiceQuestionResult implements QuestionResult{
    questionID: number;
    correct: boolean;

    @Field(()=>Int,{nullable:true})
    correctAnswerID: number

    constructor(questionID?: number,correct?: boolean,correctAnswerID?: number){
        this.questionID=questionID
        this.correct=correct;
        this.correctAnswerID=correctAnswerID;
    }
}