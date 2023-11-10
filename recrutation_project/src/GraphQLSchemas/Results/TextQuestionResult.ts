import {QuestionResult} from "./QuestionResult";
import {Field, ObjectType} from "@nestjs/graphql";


@ObjectType({implements:QuestionResult})
export class TextQuestionResult implements QuestionResult{
    questionID: number;
    correct: boolean;

    @Field({nullable:true})
    correctAnswers: string[]

    constructor(questionID?:number,correct?: boolean,correctAnswers?: string[]) {
        this.questionID=questionID;
        this.correct=correct;
        this.correctAnswers=correctAnswers;
    }
}