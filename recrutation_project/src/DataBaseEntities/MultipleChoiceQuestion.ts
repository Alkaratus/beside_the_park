import {ChildEntity} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {MultipleChoiceQuestion as AbstractMultipleChoiceQuestion} from "../Abstracts/MultipleChoiceQuestion";
import {Visitor} from "../Abstracts/Visitor";

@ChildEntity()
export class MultipleChoiceQuestion extends ChoiceQuestion implements AbstractMultipleChoiceQuestion{
    readonly multiple=true;

    accept(visitor: Visitor) {
        visitor.visitMultipleChoiceQuestionEntity(this);
    }
}