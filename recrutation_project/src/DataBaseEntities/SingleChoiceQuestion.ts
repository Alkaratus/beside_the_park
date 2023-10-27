import {ChildEntity} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";


@ChildEntity()
export class SingleChoiceQuestion extends ChoiceQuestion {
    multiple:true
}