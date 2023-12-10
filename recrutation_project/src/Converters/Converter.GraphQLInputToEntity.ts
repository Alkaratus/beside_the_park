import { DatabaseTest as TestEntity } from '../DataBase/Database.Test';
import { DatabaseSingleChoiceQuestion as SingleChoiceQuestionEntity } from '../DataBase/Database.SingleChoiceQuestion';
import { DatabaseMultipleChoiceQuestion as MultipleChoiceQuestionEntity } from '../DataBase/Database.MultipleChoiceQuestion';
import { DatabaseChoiceAnswer as ChoiceAnswerEntity } from '../DataBase/Database.ChoiceAnswer';
import { DatabaseOrderQuestion as OrderQuestionEntity } from '../DataBase/Database.OrderQuestion';
import { DatabaseOrderAnswer as OrderAnswerEntity } from '../DataBase/Database.OrderAnswer';
import { DatabaseTextQuestion as TextQuestionEntity } from '../DataBase/Database.TextQuestion';
import { DatabaseTextAnswer as TextAnswerEntity } from '../DataBase/Database.TextAnswer';
import { NewTest } from '../GraphQLSchemas/NewTest/New.Test';
import { NewSingleChoiceQuestion } from '../GraphQLSchemas/NewTest/New.SingleChoiceQuestion';
import { NewMultipleChoiceQuestion } from '../GraphQLSchemas/NewTest/New.MultipleChoiceQuestion';
import { NewChoiceAnswer } from '../GraphQLSchemas/NewTest/New.ChoiceAnswer';
import { NewOrderQuestion } from '../GraphQLSchemas/NewTest/New.OrderQuestion';
import { NewOrderAnswer } from '../GraphQLSchemas/NewTest/New.OrderAnswer';
import { NewTextQuestion } from '../GraphQLSchemas/NewTest/New.TextQuestion';
import { NewTextAnswer } from '../GraphQLSchemas/NewTest/New.TextAnswer';

import {
  EMPTY_CONTENT_ERROR,
  MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR,
  NO_QUESTIONS_ERROR,
  NOT_CONSISTENT_ORDER_NUMBERS_ERROR,
  NOT_ENOUGH_ANSWERS_ERROR,
  NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR,
} from '../Errors/Error.Codes';

export class ConverterGraphQLInputToEntity {
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
        throw NOT_CONSISTENT_ORDER_NUMBERS_ERROR;
      }
    }
  }

  private checkContentNotEmpty(content: string) {
    if (content == '') {
      throw EMPTY_CONTENT_ERROR;
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
    this.checkContentNotEmpty(singleChoiceQuestion.content);
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
    this.checkContentNotEmpty(multipleChoiceQuestion.content);
    this.convertedTest.choiceQuestions.push(
      new MultipleChoiceQuestionEntity(
        null,
        multipleChoiceQuestion.content,
        this.convertedChoiceAnswers,
      ),
    );
  }

  convertChoiceAnswer(choiceAnswer: NewChoiceAnswer): void {
    this.checkContentNotEmpty(choiceAnswer.content);
    this.convertedChoiceAnswers.push(
      new ChoiceAnswerEntity(null, choiceAnswer.content, choiceAnswer.correct),
    );
  }

  convertOrderQuestion(question: NewOrderQuestion): void {
    this.convertOrderAnswers(question.answers);
    this.checkContentNotEmpty(question.content);
    this.convertedTest.orderQuestions.push(
      new OrderQuestionEntity(
        null,
        question.content,
        this.convertedOrderAnswers,
      ),
    );
  }

  convertOrderAnswer(orderAnswer: NewOrderAnswer): void {
    this.checkContentNotEmpty(orderAnswer.content);
    this.convertedOrderAnswers.push(
      new OrderAnswerEntity(null, orderAnswer.content, orderAnswer.order),
    );
  }

  convertTextQuestion(textQuestion: NewTextQuestion): void {
    this.convertTextAnswers(textQuestion.answers);
    this.checkContentNotEmpty(textQuestion.content);
    this.convertedTest.textQuestions.push(
      new TextQuestionEntity(
        null,
        textQuestion.content,
        this.convertedTextAnswers,
      ),
    );
  }

  convertTextAnswer(textAnswer: NewTextAnswer): void {
    this.checkContentNotEmpty(textAnswer.correct);
    this.convertedTextAnswers.push(
      new TextAnswerEntity(null, textAnswer.correct),
    );
  }
}
