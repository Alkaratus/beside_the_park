import {Field, ObjectType} from "@nestjs/graphql";
import {TextAnswer} from "./TextAnswer";
import {Question} from "./Question";


@ObjectType({implements:Question})
export class TextQuestion implements Question{
    id: number;
    content: string;

    @Field(()=>[TextAnswer])
    textAnswers:TextAnswer[]
}