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

    accept(visitor: Visitor): void{
        visitor.visit(this);
    }
}