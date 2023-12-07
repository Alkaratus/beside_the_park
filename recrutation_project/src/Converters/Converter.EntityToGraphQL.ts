import { DatabaseTest as TestEntity } from '../DataBase/Database.Test';
import { Test as TestQL } from '../GraphQLSchemas/Test/Test';
import { DatabaseChoiceQuestion as ChoiceQuestionEntity } from '../DataBase/Database.ChoiceQuestion';
import { DatabaseSingleChoiceQuestion as SingleChoiceQuestionEntity } from '../DataBase/Database.SingleChoiceQuestion';
import { TestSingleChoiceQuestion as SingleChoiceQuestionQL } from '../GraphQLSchemas/Test/Test.SingleChoiceQuestion';
import { DatabaseMultipleChoiceQuestion as MultipleChoiceQuestionEntity } from '../DataBase/Database.MultipleChoiceQuestion';
import { TestMultipleChoiceQuestion as MultipleChoiceQuestionQL } from '../GraphQLSchemas/Test/Test.MultipleChoiceQuestion';
import { DatabaseChoiceAnswer as ChoiceAnswerEntity } from '../DataBase/Database.ChoiceAnswer';
import { TestChoiceAnswer as ChoiceAnswerQL } from '../GraphQLSchemas/Test/Test.ChoiceAnswer';
import { DatabaseOrderQuestion as OrderQuestionEntity } from '../DataBase/Database.OrderQuestion';
import { TestOrderQuestion as OrderQuestionQL } from '../GraphQLSchemas/Test/Test.OrderQuestion';
import { DatabaseOrderAnswer as OrderAnswerEntity } from '../DataBase/Database.OrderAnswer';
import { TestOrderAnswer as OrderAnswerQL } from '../GraphQLSchemas/Test/Test.OrderAnswer';
import { DatabaseTextQuestion as TextQuestionEntity } from '../DataBase/Database.TextQuestion';
import { TextQuestion as TextQuestionQL } from '../GraphQLSchemas/Test/TextQuestion';
import { DatabaseTextAnswer as TextAnswerEntity } from '../DataBase/Database.TextAnswer';
import { TextAnswer as TextAnswerQL } from '../GraphQLSchemas/Test/TextAnswer';
import { NewTest } from '../GraphQLSchemas/NewTest/New.Test';
import { NewSingleChoiceQuestion } from '../GraphQLSchemas/NewTest/New.SingleChoiceQuestion';
import { NewMultipleChoiceQuestion } from '../GraphQLSchemas/NewTest/New.MultipleChoiceQuestion';
import { NewChoiceAnswer } from '../GraphQLSchemas/NewTest/New.ChoiceAnswer';
import { NewOrderQuestion } from '../GraphQLSchemas/NewTest/New.OrderQuestion';
import { NewOrderAnswer } from '../GraphQLSchemas/NewTest/New.OrderAnswer';
import { NewTextQuestion } from '../GraphQLSchemas/NewTest/New.TextQuestion';
import { NewTextAnswer } from '../GraphQLSchemas/NewTest/New.TextAnswer';
import { AbstractVisitor } from '../Abstracts/Abstract.Visitor';
import { NOT_APPLICABLE_ERROR } from '../Errors/Error.Codes';

export class ConverterEntityToGraphQL implements AbstractVisitor {
  convertedTest: TestQL;
  convertedChoiceAnswers: ChoiceAnswerQL[];
  convertedOrderAnswers: OrderAnswerQL[];
  convertedTextAnswers: TextAnswerQL[];

  constructor() {
    this.setToDefault();
  }

  setToDefault() {
    this.convertedTest = new TestQL();
    this.convertedTest.singleChoiceQuestions = [];
    this.convertedTest.multipleChoiceQuestions = [];
    this.convertedTest.orderQuestions = [];
    this.convertedTest.textQuestions = [];
  }

  convertTest(test: TestEntity): TestQL {
    this.setToDefault();
    test.accept(this);
    return this.convertedTest;
  }

  convertChoiceQuestions(choiceQuestions: ChoiceQuestionEntity[]): void {
    choiceQuestions.forEach((question) => {
      question.accept(this);
    });
  }

  convertChoiceAnswers(choiceAnswers: ChoiceAnswerEntity[]) {
    this.convertedChoiceAnswers = [];
    choiceAnswers.forEach((choiceAnswer) => {
      choiceAnswer.accept(this);
    });
  }

  convertOrderQuestions(orderQuestions: OrderQuestionEntity[]) {
    orderQuestions.forEach((question) => {
      question.accept(this);
    });
  }

  convertOrderAnswers(orderAnswers: OrderAnswerEntity[]) {
    this.convertedOrderAnswers = [];
    orderAnswers.forEach((orderAnswer) => {
      orderAnswer.accept(this);
    });
  }

  convertTextQuestions(textQuestions: TextQuestionEntity[]) {
    textQuestions.forEach((question) => {
      question.accept(this);
    });
  }

  convertTextAnswers(textAnswers: TextAnswerEntity[]) {
    this.convertedTextAnswers = [];
    textAnswers.forEach((textAnswer) => {
      textAnswer.accept(this);
    });
  }

  visitTestEntity(test: TestEntity): void {
    this.convertedTest.id = test.id;
    this.convertedTest.name = test.name;
    this.convertChoiceQuestions(test.choiceQuestions);
    this.convertOrderQuestions(test.orderQuestions);
    this.convertTextQuestions(test.textQuestions);
  }

  visitSingleChoiceQuestionEntity(question: SingleChoiceQuestionEntity): void {
    this.convertChoiceAnswers(question.answers);
    this.convertedTest.singleChoiceQuestions.push(
      new SingleChoiceQuestionQL(
        question.id,
        question.content,
        this.convertedChoiceAnswers,
      ),
    );
  }

  visitMultipleChoiceQuestionEntity(
    question: MultipleChoiceQuestionEntity,
  ): void {
    this.convertChoiceAnswers(question.answers);
    this.convertedTest.multipleChoiceQuestions.push(
      new MultipleChoiceQuestionQL(
        question.id,
        question.content,
        this.convertedChoiceAnswers,
      ),
    );
  }

  visitChoiceAnswerEntity(answer: ChoiceAnswerEntity): void {
    const convertedAnswer: ChoiceAnswerQL = new ChoiceAnswerQL(
      answer.id,
      answer.content,
      answer.correct,
    );
    this.convertedChoiceAnswers.push(convertedAnswer);
  }

  visitOrderQuestionEntity(question: OrderQuestionEntity): void {
    this.convertOrderAnswers(question.answers);
    this.convertedTest.orderQuestions.push(
      new OrderQuestionQL(
        question.id,
        question.content,
        this.convertedOrderAnswers,
      ),
    );
  }

  visitOrderAnswerEntity(answer: OrderAnswerEntity): void {
    const convertedAnswer: OrderAnswerQL = new OrderAnswerQL(
      answer.id,
      answer.content,
      answer.order,
    );
    this.convertedOrderAnswers.push(convertedAnswer);
  }

  visitTextQuestionEntity(question: TextQuestionEntity): void {
    this.convertTextAnswers(question.answers);
    this.convertedTest.textQuestions.push(
      new TextQuestionQL(
        question.id,
        question.content,
        this.convertedTextAnswers,
      ),
    );
  }

  visitTextAnswerEntity(answer: TextAnswerEntity): void {
    const convertedAnswer: TextAnswerQL = new TextAnswerQL(
      answer.id,
      answer.correct,
    );
    this.convertedTextAnswers.push(convertedAnswer);
  }

  visitTestQL(test: TestQL): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitSingleChoiceQuestionQL(
    singleChoiceQuestion: SingleChoiceQuestionQL,
  ): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitMultipleChoiceQuestionQL(
    multipleChoiceQuestion: MultipleChoiceQuestionQL,
  ): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitChoiceAnswerQL(choiceAnswer: ChoiceAnswerQL): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitOrderQuestionQL(orderQuestion: OrderQuestionQL): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitOrderAnswerQL(orderAnswer: OrderAnswerQL): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitTextQuestionQL(textQuestion: TextQuestionQL): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitTextAnswerQL(textAnswer: TextAnswerQL): void {
    throw NOT_APPLICABLE_ERROR;
  }

  visitNewTest(test: NewTest): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitNewSingleChoiceQuestion(
    singleChoiceQuestion: NewSingleChoiceQuestion,
  ): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitNewMultipleChoiceQuestion(
    multipleChoiceQuestion: NewMultipleChoiceQuestion,
  ): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitNewChoiceAnswer(choiceAnswer: NewChoiceAnswer): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitNewOrderQuestion(orderChoiceQuestion: NewOrderQuestion): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitNewOrderAnswer(orderAnswer: NewOrderAnswer): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitNewTextQuestion(textQuestion: NewTextQuestion): void {
    throw NOT_APPLICABLE_ERROR;
  }
  visitNewTextAnswer(textAnswer: NewTextAnswer): void {
    throw NOT_APPLICABLE_ERROR;
  }
}
