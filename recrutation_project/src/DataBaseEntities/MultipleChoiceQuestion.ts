import {ChildEntity} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";


@ChildEntity()
export class MultipleChoiceQuestion extends ChoiceQuestion {
    readonly multiple=true;
}