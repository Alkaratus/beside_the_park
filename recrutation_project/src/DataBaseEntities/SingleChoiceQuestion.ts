import {ChildEntity} from "typeorm";
import {ChoiceQuestion} from "./ChoiceQuestion";
import {SingleChoiceQuestion as AbstractSingleChoiceQuestion} from "../Abstracts/SingleChoiceQuestion";
import {Visitor} from "../Abstracts/Visitor";
import {ChoiceAnswer} from "./ChoiceAnswer";


@ChildEntity()
export class SingleChoiceQuestion extends ChoiceQuestion implements AbstractSingleChoiceQuestion{
    readonly multiple=false;

    constructor(id?:number,content?:string,answers?:ChoiceAnswer[]) {
        super(id,content,answers);
    }

    accept(visitor: Visitor) {
        visitor.visitSingleChoiceQuestionEntity(this);
    }
}