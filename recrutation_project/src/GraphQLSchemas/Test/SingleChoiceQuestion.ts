import {ObjectType} from "@nestjs/graphql";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {ChoiceAnswer} from "./ChoiceAnswer";
import {Question} from "./Question";


@ObjectType({implements:[Question, ChoiceQuestion]})
export class SingleChoiceQuestion implements ChoiceQuestion{
    id: number;
    content: string;
    choiceAnswers: ChoiceAnswer[];
}