import {ChoiceQuestion} from "./ChoiceQuestion";
import {OrderQuestion} from "./OrderQuestion";
import {TextQuestion} from "./TextQuestion";


export class Test{
    name: string;
    choiceQuestions: ChoiceQuestion[]
    orderQuestions: OrderQuestion[]
    textQuestions: TextQuestion[]
}