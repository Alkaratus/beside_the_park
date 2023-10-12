
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewSingleChoiceQuestion {
    content: string;
    answers: NewChoiceAnswer[];
}

export class NewMultipleChoiceQuestion {
    content: string;
    answers: NewChoiceAnswer[];
}

export class NewChoiceAnswer {
    content: string;
    correct: boolean;
}

export class NewOrderQuestion {
    content: string;
    answers: NewOrderAnswer[];
}

export class NewOrderAnswer {
    content: string;
    position: number;
}

export class NewTextQuestion {
    content: string;
    answers: NewTextAnswer[];
}

export class NewTextAnswer {
    correct: string;
}

export class NewTest {
    name: string;
    singleChoiceQuestions?: Nullable<NewSingleChoiceQuestion[]>;
    multipleChoiceQuestions?: Nullable<NewMultipleChoiceQuestion[]>;
    orderQuestions?: Nullable<NewOrderQuestion[]>;
    textQuestions?: Nullable<NewTextQuestion[]>;
}

export class QuestionAnswers {
    singleChoiceQuestionsAnswers?: Nullable<SingleChoiceQuestionsAnswer[]>;
    multipleChoiceQuestionsAnswers?: Nullable<MultipleChoiceQuestionAnswer[]>;
}

export class SingleChoiceQuestionsAnswer {
    questionID: string;
    answerID: string;
}

export class MultipleChoiceQuestionAnswer {
    questionID: string;
    answersID?: Nullable<string[]>;
}

export class OrderQuestionAnswer {
    questionID: string;
    answersID: string[];
}

export class TextQuestionAnswer {
    questionID: string;
    answer?: Nullable<string>;
}

export interface Question {
    id: string;
    content: string;
}

export class Test {
    id: string;
    name: string;
    questions: Question[];
}

export class SingleChoiceQuestion implements Question {
    id: string;
    content: string;
    answers: ChoiceAnswer[];
}

export class MultipleChoiceQuestion implements Question {
    id: string;
    content: string;
    answers: ChoiceAnswer[];
}

export class OrderQuestion implements Question {
    id: string;
    content: string;
    answers: OrderAnswer[];
}

export class TextQuestion implements Question {
    id: string;
    content: string;
    answers: TextAnswer[];
}

export class ChoiceAnswer {
    id: string;
    content: string;
    correct: boolean;
}

export class OrderAnswer {
    id: string;
    content: string;
    position: number;
}

export class TextAnswer {
    id: string;
    correct: string;
}

export abstract class IQuery {
    abstract tests(): Nullable<Test[]> | Promise<Nullable<Test[]>>;
}

export abstract class IMutation {
    abstract createTest(newTest?: Nullable<NewTest>): Nullable<Test> | Promise<Nullable<Test>>;

    abstract submitAnswers(id?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;
