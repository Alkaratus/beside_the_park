import {Field, Int, ObjectType} from "@nestjs/graphql";


@ObjectType()
export abstract class QuestionResult{
    @Field(()=>Int)
    questionID: number

    @Field()
    correct: boolean;
}