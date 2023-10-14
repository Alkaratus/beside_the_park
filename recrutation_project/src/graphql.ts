
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewTest {
    name: string;
    singleChoiceQuestions?: Nullable<NewSingleChoiceQuestion[]>;
    multipleChoiceQuestions?: Nullable<NewMultipleChoiceQuestion[]>;
    orderQuestions?: Nullable<NewOrderQuestion[]>;
    textQuestions?: Nullable<NewTextQuestion[]>;
}

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

export class QuestionAnswers {
    testID: string;
    singleChoiceQuestionsAnswers?: Nullable<SingleChoiceQuestionsAnswer[]>;
    multipleChoiceQuestionsAnswers?: Nullable<MultipleChoiceQuestionAnswer[]>;
    orderQuestionsAnswers?: Nullable<OrderQuestionAnswer[]>;
    textQuestionsAnswers?: Nullable<TextQuestionAnswer[]>;
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

export interface QuestionResults {
    questionID: number;
    correct: boolean;
}

export interface Question {
    id: number;
    content: string;
}

export class TestResults {
    testID: number;
    numberOfCorrect: number;
}

export class SingleChoiceQuestionResult implements QuestionResults {
    questionID: number;
    correct: boolean;
    correctAnswerID?: Nullable<string>;
}

export class MultipleChoiceQuestionResult implements QuestionResults {
    questionID: number;
    correct: boolean;
    correctAnswerID?: Nullable<Nullable<string>[]>;
}

export class OrderChoiceQuestionResult implements QuestionResults {
    questionID: number;
    correct: boolean;
    correctAnswersIDOrder?: Nullable<string[]>;
}

export class TextQuestionResult implements QuestionResults {
    questionID: number;
    correct: boolean;
    correctAnswersID?: Nullable<string[]>;
}

export class Test {
    id: number;
    name: string;
    questions: Question[];
}

export class SingleChoiceQuestion implements Question {
    id: number;
    content: string;
    answers: ChoiceAnswer[];
}

export class MultipleChoiceQuestion implements Question {
    id: number;
    content: string;
    answers: ChoiceAnswer[];
}

export class OrderQuestion implements Question {
    id: number;
    content: string;
    answers: OrderAnswer[];
}

export class TextQuestion implements Question {
    id: number;
    content: string;
    answers: TextAnswer[];
}

export class ChoiceAnswer {
    id: number;
    content: string;
    correct: boolean;
}

export class OrderAnswer {
    id: number;
    content: string;
    position: number;
}

export class TextAnswer {
    id: number;
    correct: string;
}

export abstract class IQuery {
    abstract tests(): Nullable<Test[]> | Promise<Nullable<Test[]>>;
}

export abstract class IMutation {
    abstract createTest(newTest?: Nullable<NewTest>): Nullable<Test> | Promise<Nullable<Test>>;

    abstract submitAnswers(answers?: Nullable<QuestionAnswers>): Nullable<TestResults> | Promise<Nullable<TestResults>>;
}

type Nullable<T> = T | null;
