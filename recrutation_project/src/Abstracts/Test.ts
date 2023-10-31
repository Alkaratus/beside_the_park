import {ChoiceQuestion} from "./ChoiceQuestion";
import {OrderQuestion} from "./OrderQuestion";
import {TextQuestion} from "./TextQuestion";
import {NewTest} from "../graphql";

export class Test{
    name: string;
    choiceQuestions: ChoiceQuestion[]
    orderQuestions: OrderQuestion[]
    textQuestions: TextQuestion[]
}