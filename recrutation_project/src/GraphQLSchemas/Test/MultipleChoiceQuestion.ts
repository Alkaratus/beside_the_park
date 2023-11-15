import {ObjectType} from "@nestjs/graphql";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {ChoiceAnswer} from "./ChoiceAnswer";
import {Question} from "./Question";
import {MultipleChoiceQuestion as AbstractMultipleChoiceQuestion} from "../../Abstracts/MultipleChoiceQuestion";
import {Visitor} from "../../Abstracts/Visitor";


@ObjectType({implements:[Question, ChoiceQuestion]})
export class MultipleChoiceQuestion implements ChoiceQuestion, AbstractMultipleChoiceQuestion{
    id: number;
    content: string;
    choiceAnswers: ChoiceAnswer[];

    constructor(id?: number, content?: string, choiceAnswers?:ChoiceAnswer[]){
        this.id=id;
        this.content=content;
        this.choiceAnswers=choiceAnswers;
    }
    
    accept(visitor: Visitor): void{
        visitor.visitMultipleChoiceQuestionQL(this);
    }
}