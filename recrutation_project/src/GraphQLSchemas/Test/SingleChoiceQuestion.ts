import {ObjectType} from "@nestjs/graphql";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {ChoiceAnswer} from "./ChoiceAnswer";
import {Question} from "./Question";
import {SingleChoiceQuestion as AbstractSingleChoiceQuestion} from "../../Abstracts/SingleChoiceQuestion";
import {Visitor} from "../../Abstracts/Visitor";

@ObjectType({implements:[Question, ChoiceQuestion]})
export class SingleChoiceQuestion implements ChoiceQuestion, AbstractSingleChoiceQuestion{
    id: number;
    content: string;
    choiceAnswers: ChoiceAnswer[];

    accept(visitor:Visitor):void{
        visitor.visitSingleChoiceQuestionQL(this)
    }
}