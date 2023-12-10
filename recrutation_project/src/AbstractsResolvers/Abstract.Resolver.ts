import { DatabaseTest as TestEntity } from '../DataBase/Database.Test';
import { Test as TestQL } from '../GraphQLSchemas/Test/Test';
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

export class AbstractResolver implements AbstractVisitor {
  testEntity: TestEntity;
  singleChoiceQuestionEntity: SingleChoiceQuestionEntity;
  multipleChoiceQuestionEntity: MultipleChoiceQuestionEntity;
  choiceAnswerEntity: ChoiceAnswerEntity;
  orderQuestionEntity: OrderQuestionEntity;
  orderAnswerEntity: OrderAnswerEntity;
  textQuestionEntity: TextQuestionEntity;
  textAnswerEntity: TextAnswerEntity;

  testQL: TestQL;
  singleChoiceQuestionQL: SingleChoiceQuestionQL;
  multipleChoiceQuestionQL: MultipleChoiceQuestionQL;
  choiceAnswerQL: ChoiceAnswerQL;
  orderQuestionQL: OrderQuestionQL;
  orderAnswerQL: OrderAnswerQL;
  textQuestionQL: TextQuestionQL;
  textAnswerQL: TextAnswerQL;

  newTest: NewTest;
  newSingleChoiceQuestion: NewSingleChoiceQuestion;
  newMultipleChoiceQuestion: NewMultipleChoiceQuestion;
  newChoiceAnswer: NewChoiceAnswer;
  newOrderQuestion: NewOrderQuestion;
  newOrderAnswer: NewOrderAnswer;
  newTextQuestion: NewTextQuestion;
  newTextAnswer: NewTextAnswer;

  visitTestEntity(test: TestEntity): void {
    this.testEntity = test;
  }

  visitSingleChoiceQuestionEntity(
    singleChoiceQuestion: SingleChoiceQuestionEntity,
  ): void {
    this.singleChoiceQuestionEntity = singleChoiceQuestion;
  }

  visitMultipleChoiceQuestionEntity(
    multipleChoiceQuestion: MultipleChoiceQuestionEntity,
  ): void {
    this.multipleChoiceQuestionEntity = multipleChoiceQuestion;
  }

  visitChoiceAnswerEntity(choiceAnswer: ChoiceAnswerEntity): void {
    this.choiceAnswerEntity = choiceAnswer;
  }

  visitOrderQuestionEntity(orderQuestion: OrderQuestionEntity): void {
    this.orderQuestionEntity = orderQuestion;
  }

  visitOrderAnswerEntity(orderAnswer: OrderAnswerEntity): void {
    this.orderAnswerEntity = orderAnswer;
  }

  visitTextQuestionEntity(textQuestion: TextQuestionEntity): void {
    this.textQuestionEntity = textQuestion;
  }

  visitTextAnswerEntity(textAnswer: TextAnswerEntity): void {
    this.textAnswerEntity = textAnswer;
  }

  visitTestQL(test: TestQL): void {
    this.testQL = test;
  }

  visitSingleChoiceQuestionQL(
    singleChoiceQuestion: SingleChoiceQuestionQL,
  ): void {
    this.singleChoiceQuestionQL = singleChoiceQuestion;
  }

  visitMultipleChoiceQuestionQL(
    multipleChoiceQuestion: MultipleChoiceQuestionQL,
  ): void {
    this.multipleChoiceQuestionQL = multipleChoiceQuestion;
  }

  visitChoiceAnswerQL(choiceAnswer: ChoiceAnswerQL): void {
    this.choiceAnswerQL = choiceAnswer;
  }

  visitOrderQuestionQL(orderQuestion: OrderQuestionQL): void {
    this.orderQuestionQL = orderQuestion;
  }

  visitOrderAnswerQL(orderAnswer: OrderAnswerQL): void {
    this.orderAnswerQL = orderAnswer;
  }

  visitTextQuestionQL(textQuestion: TextQuestionQL): void {
    this.textQuestionQL = textQuestion;
  }

  visitTextAnswerQL(textAnswer: TextAnswerQL): void {
    this.textAnswerQL = textAnswer;
  }

  visitNewTest(test: NewTest): void {
    this.newTest = test;
  }

  visitNewSingleChoiceQuestion(
    singleChoiceQuestion: NewSingleChoiceQuestion,
  ): void {
    this.newSingleChoiceQuestion = singleChoiceQuestion;
  }

  visitNewMultipleChoiceQuestion(
    multipleChoiceQuestion: NewMultipleChoiceQuestion,
  ): void {
    this.newMultipleChoiceQuestion = multipleChoiceQuestion;
  }

  visitNewChoiceAnswer(choiceAnswer: NewChoiceAnswer): void {
    this.newChoiceAnswer = choiceAnswer;
  }

  visitNewOrderQuestion(orderChoiceQuestion: NewOrderQuestion): void {
    this.newOrderQuestion = orderChoiceQuestion;
  }

  visitNewOrderAnswer(orderAnswer: NewOrderAnswer): void {
    this.newOrderAnswer = orderAnswer;
  }

  visitNewTextQuestion(textQuestion: NewTextQuestion): void {
    this.newTextQuestion = textQuestion;
  }

  visitNewTextAnswer(textAnswer: NewTextAnswer): void {
    this.newTextAnswer = textAnswer;
  }
}
