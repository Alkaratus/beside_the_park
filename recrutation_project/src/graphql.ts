
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
    order: number;
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
    singleChoiceQuestionsAnswers?: Nullable<SingleChoiceQuestionAnswer[]>;
    multipleChoiceQuestionsAnswers?: Nullable<MultipleChoiceQuestionAnswer[]>;
    orderQuestionsAnswers?: Nullable<OrderQuestionAnswer[]>;
    textQuestionsAnswers?: Nullable<TextQuestionAnswer[]>;
}

export class SingleChoiceQuestionAnswer {
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

export interface ChoiceQuestion extends Question {
    id: number;
    content: string;
    choiceAnswers: ChoiceAnswer[];
}

export abstract class IQuery {
    abstract tests(): Nullable<Test[]> | Promise<Nullable<Test[]>>;
}

export abstract class IMutation {
    abstract createTest(newTest?: Nullable<NewTest>): Nullable<Test> | Promise<Nullable<Test>>;

    abstract submitAnswers(answers?: Nullable<QuestionAnswers>): Nullable<TestResults> | Promise<Nullable<TestResults>>;
}

export class TestResults {
    testID: number;
    numberOfCorrect: number;
    singleChoiceQuestionResults?: Nullable<SingleChoiceQuestionResult[]>;
    multipleChoiceQuestionResults?: Nullable<MultipleChoiceQuestionResult[]>;
    orderQuestionResults?: Nullable<OrderQuestionResult[]>;
    textQuestionResults?: Nullable<TextQuestionResult[]>;
}

export class SingleChoiceQuestionResult implements QuestionResults {
    questionID: number;
    correct: boolean;
    correctAnswerID?: Nullable<number>;
}

export class MultipleChoiceQuestionResult implements QuestionResults {
    questionID: number;
    correct: boolean;
    correctAnswerID?: Nullable<number[]>;
}

export class OrderQuestionResult implements QuestionResults {
    questionID: number;
    correct: boolean;
    correctAnswersIDOrder?: Nullable<number[]>;
}

export class TextQuestionResult implements QuestionResults {
    questionID: number;
    correct: boolean;
    correctAnswersID?: Nullable<number[]>;
}

export class Test {
    id: number;
    name: string;
    singleChoiceQuestions?: Nullable<SingleChoiceQuestion[]>;
    multipleChoiceQuestions?: Nullable<MultipleChoiceQuestion[]>;
    orderQuestions?: Nullable<OrderQuestion[]>;
    textQuestions?: Nullable<TextQuestion[]>;
}

export class SingleChoiceQuestion implements Question, ChoiceQuestion {
    id: number;
    content: string;
    choiceAnswers: ChoiceAnswer[];
}

export class MultipleChoiceQuestion implements Question, ChoiceQuestion {
    id: number;
    content: string;
    choiceAnswers: ChoiceAnswer[];
}

export class OrderQuestion implements Question {
    id: number;
    content: string;
    orderAnswers: OrderAnswer[];
}

export class TextQuestion implements Question {
    id: number;
    content: string;
    textAnswers: TextAnswer[];
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

type Nullable<T> = T | null;
