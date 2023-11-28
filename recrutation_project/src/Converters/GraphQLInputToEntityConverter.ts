import { Test as TestEntity } from '../DataBaseEntities/Test';
import { SingleChoiceQuestion as SingleChoiceQuestionEntity } from '../DataBaseEntities/SingleChoiceQuestion';
import { MultipleChoiceQuestion as MultipleChoiceQuestionEntity } from '../DataBaseEntities/MultipleChoiceQuestion';
import { ChoiceAnswer as ChoiceAnswerEntity } from '../DataBaseEntities/ChoiceAnswer';
import { OrderQuestion as OrderQuestionEntity } from '../DataBaseEntities/OrderQuestion';
import { OrderAnswer as OrderAnswerEntity } from '../DataBaseEntities/OrderAnswer';
import { TextQuestion as TextQuestionEntity } from '../DataBaseEntities/TextQuestion';
import { TextAnswer as TextAnswerEntity } from '../DataBaseEntities/TextAnswer';
import { NewTest } from '../GraphQLSchemas/NewTest/NewTest';
import { NewSingleChoiceQuestion } from '../GraphQLSchemas/NewTest/NewSingleChoiceQuestion';
import { NewMultipleChoiceQuestion } from '../GraphQLSchemas/NewTest/NewMultipleChoiceQuestion';
import { NewChoiceAnswer } from '../GraphQLSchemas/NewTest/NewChoiceAnswer';
import { NewOrderQuestion } from '../GraphQLSchemas/NewTest/NewOrderQuestion';
import { NewOrderAnswer } from '../GraphQLSchemas/NewTest/NewOrderAnswer';
import { NewTextQuestion } from '../GraphQLSchemas/NewTest/NewTextQuestion';
import { NewTextAnswer } from '../GraphQLSchemas/NewTest/NewTextAnswer';

import {
  MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR,
  NO_QUESTIONS_ERROR,
  NOT_CONSISTENT_ORDER_NUMBERS,
  NOT_ENOUGH_ANSWERS_ERROR,
  NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR,
} from '../Errors/ErrorCodes';

export class GraphQLInputToEntityConverter {
  numberOfQuestions: number;
  convertedTest: TestEntity;
  convertedChoiceAnswers: ChoiceAnswerEntity[];
  convertedOrderAnswers: OrderAnswerEntity[];
  convertedTextAnswers: TextAnswerEntity[];

  private checkOrderAnswersUniqueOrder() {
    this.convertedOrderAnswers.forEach((checkedQuestion) => {
      let questionsWithSpecificOrderNumber = 0;
      this.convertedOrderAnswers.forEach((question) => {
        questionsWithSpecificOrderNumber +=
          checkedQuestion.order == question.order ? 1 : 0;
      });
      if (questionsWithSpecificOrderNumber != 1) {
        throw MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR;
      }
    });
  }

  private checkOrderAnswersConsistentOrder() {
    for (let i = 0; i < this.convertedOrderAnswers.length; i++) {
      if (!this.convertedOrderAnswers.some((answer) => answer.order == i + 1)) {
        throw NOT_CONSISTENT_ORDER_NUMBERS;
      }
    }
  }

  convertTest(test: NewTest): TestEntity {
    this.convertedTest = new TestEntity();
    this.convertedTest.setToDefault();
    this.convertedTest.name = test.name;
    this.convertSingleChoiceQuestions(test.singleChoiceQuestions);
    this.convertMultipleChoiceQuestions(test.multipleChoiceQuestions);
    this.convertOrderQuestions(test.orderQuestions);
    this.convertTextQuestions(test.textQuestions);
    this.numberOfQuestions = this.convertedTest.choiceQuestions.length;
    this.numberOfQuestions += this.convertedTest.orderQuestions.length;
    this.numberOfQuestions += this.convertedTest.textQuestions.length;
    if (this.numberOfQuestions == 0) {
      throw NO_QUESTIONS_ERROR;
    }
    return this.convertedTest;
  }

  convertSingleChoiceQuestions(questions: NewSingleChoiceQuestion[]) {
    questions.forEach((question) => {
      this.convertSingleChoiceQuestion(question);
    });
  }

  convertMultipleChoiceQuestions(questions: NewMultipleChoiceQuestion[]) {
    questions.forEach((question) => {
      this.convertMultipleChoiceQuestion(question);
    });
  }

  convertChoiceAnswers(
    answers: NewChoiceAnswer[],
    multiple: boolean = false,
  ): void {
    this.convertedChoiceAnswers = [];
    let correctCounter = 0;
    if (answers.length < 2) {
      throw NOT_ENOUGH_ANSWERS_ERROR;
    }
    answers.forEach((answer) => {
      correctCounter += answer.correct ? 1 : 0;
      this.convertChoiceAnswer(answer);
    });
    if (!multiple && correctCounter != 1) {
      throw NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR;
    }
  }

  convertOrderQuestions(orderQuestions: NewOrderQuestion[]) {
    orderQuestions.forEach((question) => {
      this.convertOrderQuestion(question);
    });
  }

  convertOrderAnswers(orderAnswers: NewOrderAnswer[]) {
    this.convertedOrderAnswers = [];
    if (orderAnswers.length < 2) {
      throw NOT_ENOUGH_ANSWERS_ERROR;
    }
    orderAnswers.forEach((answer) => {
      this.convertOrderAnswer(answer);
    });
    this.checkOrderAnswersUniqueOrder();
    this.checkOrderAnswersConsistentOrder();
  }

  convertTextQuestions(textQuestions: NewTextQuestion[]) {
    textQuestions.forEach((question) => {
      this.convertTextQuestion(question);
    });
  }

  convertTextAnswers(textAnswers: NewTextAnswer[]) {
    this.convertedTextAnswers = [];
    if (textAnswers.length == 0) {
      throw NOT_ENOUGH_ANSWERS_ERROR;
    }
    textAnswers.forEach((answer) => {
      this.convertTextAnswer(answer);
    });
  }

  convertSingleChoiceQuestion(
    singleChoiceQuestion: NewSingleChoiceQuestion,
  ): void {
    this.convertChoiceAnswers(singleChoiceQuestion.answers);
    this.convertedTest.choiceQuestions.push(
      new SingleChoiceQuestionEntity(
        null,
        singleChoiceQuestion.content,
        this.convertedChoiceAnswers,
      ),
    );
  }

  convertMultipleChoiceQuestion(
    multipleChoiceQuestion: NewMultipleChoiceQuestion,
  ): void {
    this.convertChoiceAnswers(multipleChoiceQuestion.answers, true);
    this.convertedTest.choiceQuestions.push(
      new MultipleChoiceQuestionEntity(
        null,
        multipleChoiceQuestion.content,
        this.convertedChoiceAnswers,
      ),
    );
  }

  convertChoiceAnswer(choiceAnswer: NewChoiceAnswer): void {
    this.convertedChoiceAnswers.push(
      new ChoiceAnswerEntity(null, choiceAnswer.content, choiceAnswer.correct),
    );
  }

  convertOrderQuestion(question: NewOrderQuestion): void {
    this.convertOrderAnswers(question.answers);
    this.convertedTest.orderQuestions.push(
      new OrderQuestionEntity(
        null,
        question.content,
        this.convertedOrderAnswers,
      ),
    );
  }

  convertOrderAnswer(orderAnswer: NewOrderAnswer): void {
    this.convertedOrderAnswers.push(
      new OrderAnswerEntity(null, orderAnswer.content, orderAnswer.order),
    );
  }

  convertTextQuestion(textQuestion: NewTextQuestion): void {
    this.convertTextAnswers(textQuestion.answers);
    this.convertedTest.textQuestions.push(
      new TextQuestionEntity(
        null,
        textQuestion.content,
        this.convertedTextAnswers,
      ),
    );
  }

  convertTextAnswer(textAnswer: NewTextAnswer): void {
    this.convertedTextAnswers.push(
      new TextAnswerEntity(null, textAnswer.correct),
    );
  }
}
