import {ObjectType} from "@nestjs/graphql";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {ChoiceAnswer} from "../../graphql";


@ObjectType({implements:[ChoiceQuestion]})
export class MultipleChoiceQuestion implements ChoiceQuestion{
    id: number;
    content: string;
    choiceAnswers: ChoiceAnswer[];
}