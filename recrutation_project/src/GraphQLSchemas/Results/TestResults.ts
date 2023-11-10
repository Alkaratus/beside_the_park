import {Field, Int, ObjectType} from "@nestjs/graphql";
import {SingleChoiceQuestionResult} from "./SingleChoiceQuestionResult";
import {MultipleChoiceQuestionResult} from "./MultipleChoiceQuestionResult";
import {OrderQuestionResult} from "./OrderQuestionResult";
import {TextQuestionResult} from "./TextQuestionResult";


@ObjectType()
export class TestResults{
    @Field(()=>Int)
    testID: number
    @Field(()=>Int)
    numberOfCorrect: number
    @Field(()=>[SingleChoiceQuestionResult])
    singleChoiceQuestionResults: SingleChoiceQuestionResult[]
    @Field(()=>[MultipleChoiceQuestionResult])
    multipleChoiceQuestionResults:MultipleChoiceQuestionResult[]
    @Field(()=>[OrderQuestionResult])
    orderQuestionResults:OrderQuestionResult[]
    @Field(()=>[TextQuestionResult])
    textQuestionResults:TextQuestionResult[]

    constructor(testID: number=0,numberOfCorrect: number=0,singleChoiceQuestionResults?: SingleChoiceQuestionResult[],multipleChoiceQuestionResults?:MultipleChoiceQuestionResult[],orderQuestionResults?:OrderQuestionResult[],textQuestionResults?:TextQuestionResult[]){
        this.testID=testID
        this.numberOfCorrect=numberOfCorrect;
        this.singleChoiceQuestionResults=singleChoiceQuestionResults;
        this.multipleChoiceQuestionResults=multipleChoiceQuestionResults
        this.orderQuestionResults=orderQuestionResults;
        this.textQuestionResults=textQuestionResults;
    }
}
