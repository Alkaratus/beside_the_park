import {ChoiceQuestion} from "./ChoiceQuestion";
import {OrderQuestion} from "./OrderQuestion";
import {TextQuestion} from "./TextQuestion";

export class TestDTO {
    name: string;
    choiceQuestions: ChoiceQuestion[]
    orderQuestions: OrderQuestion[]
    textQuestions: TextQuestion[]
}