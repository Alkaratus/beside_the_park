import {Field, InterfaceType} from "@nestjs/graphql";
import {Question} from "./Question";
import {ChoiceAnswer} from "./ChoiceAnswer";


@InterfaceType({implements:Question})
export abstract class ChoiceQuestion implements Question{
    id: number;
    content: string;
    @Field(()=>[ChoiceAnswer])
    choiceAnswers:ChoiceAnswer[]
}