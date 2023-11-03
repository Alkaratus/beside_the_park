import {Field, ObjectType} from "@nestjs/graphql";
import {TextAnswer} from "./TextAnswer";
import {Question} from "./Question";
import {TextQuestion as AbstractTextQuestion} from "../../Abstracts/TextQuestion";
import {Visitor} from "../../Abstracts/Visitor";


@ObjectType({implements:Question})
export class TextQuestion implements Question, AbstractTextQuestion{
    id: number;
    content: string;

    @Field(()=>[TextAnswer])
    textAnswers:TextAnswer[]

    accept(visitor: Visitor): void {
        visitor.visit(this)
    }
}