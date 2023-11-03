import {ChildEntity} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {SingleChoiceQuestion as AbstractSingleChoiceQuestion} from "../Abstracts/SingleChoiceQuestion";
import {Visitor} from "../Abstracts/Visitor";


@ChildEntity()
export class SingleChoiceQuestion extends ChoiceQuestion implements AbstractSingleChoiceQuestion{
    readonly multiple=false;

    accept(visitor: Visitor) {
        visitor.visit(this);
    }
}