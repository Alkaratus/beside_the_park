import { Test as TestEntity } from '../DataBaseEntities/Test';
import { Test as AbstractTest } from '../Abstracts/Test';
import { Test as TestQL } from '../GraphQLSchemas/Test/Test';
import { SingleChoiceQuestion as SingleChoiceQuestionEntity } from '../DataBaseEntities/SingleChoiceQuestion';
import { SingleChoiceQuestion as SingleChoiceQuestionQL } from '../GraphQLSchemas/Test/SingleChoiceQuestion';
import { MultipleChoiceQuestion as MultipleChoiceQuestionEntity } from '../DataBaseEntities/MultipleChoiceQuestion';
import { MultipleChoiceQuestion as MultipleChoiceQuestionQL } from '../GraphQLSchemas/Test/MultipleChoiceQuestion';
import { ChoiceAnswer as ChoiceAnswerEntity } from '../DataBaseEntities/ChoiceAnswer';
import { ChoiceAnswer as ChoiceAnswerQL } from '../GraphQLSchemas/Test/ChoiceAnswer';
import { OrderQuestion as OrderQuestionEntity } from '../DataBaseEntities/OrderQuestion';
import { OrderQuestion as OrderQuestionQL } from '../GraphQLSchemas/Test/OrderQuestion';
import { OrderAnswer as OrderAnswerEntity } from '../DataBaseEntities/OrderAnswer';
import { OrderAnswer as OrderAnswerQL } from '../GraphQLSchemas/Test/OrderAnswer';
import { TextQuestion as TextQuestionEntity } from '../DataBaseEntities/TextQuestion';
import { TextQuestion as TextQuestionQL } from '../GraphQLSchemas/Test/TextQuestion';
import { TextAnswer as TextAnswerEntity } from '../DataBaseEntities/TextAnswer';
import { TextAnswer as TextAnswerQL } from '../GraphQLSchemas/Test/TextAnswer';
import { NewTest } from '../GraphQLSchemas/NewTest/NewTest';
import { NewSingleChoiceQuestion } from '../GraphQLSchemas/NewTest/NewSingleChoiceQuestion';
import { NewMultipleChoiceQuestion } from '../GraphQLSchemas/NewTest/NewMultipleChoiceQuestion';
import { NewChoiceAnswer } from '../GraphQLSchemas/NewTest/NewChoiceAnswer';
import { NewOrderQuestion } from '../GraphQLSchemas/NewTest/NewOrderQuestion';
import { NewOrderAnswer } from '../GraphQLSchemas/NewTest/NewOrderAnswer';
import { NewTextQuestion } from '../GraphQLSchemas/NewTest/NewTextQuestion';
import { NewTextAnswer } from '../GraphQLSchemas/NewTest/NewTextAnswer';
import { Visitor } from '../Abstracts/Visitor';
import { NOT_APPLICABLE_ERROR } from '../Errors/ErrorCodes';
import { MultipleChoiceQuestionResult } from '../GraphQLSchemas/Results/MultipleChoiceQuestionResult';
import { OrderQuestionResult } from '../GraphQLSchemas/Results/OrderQuestionResult';
import { SingleChoiceQuestionResult } from '../GraphQLSchemas/Results/SingleChoiceQuestionResult';
import { TestAnswers } from '../GraphQLSchemas/QuestionAnswers/TestAnswers';
import { TestResults } from '../GraphQLSchemas/Results/TestResults';
import { TextQuestionResult } from '../GraphQLSchemas/Results/TextQuestionResult';

export class TestChecker implements Visitor {
  testResults: TestResults;
  answers: TestAnswers;
  checkTestAnswers(test: AbstractTest, answers: TestAnswers): TestResults {
    this.testResults = new TestResults();
    this.testResults.setToDefault();
    this.answers = answers;
    test.accept(this);
    return this.testResults;
  }

  checkMultipleChoiceQuestion(
    correctAnswersIDs: number[],
    questionAnswersIDs: number[],
  ): boolean {
    let correct = questionAnswersIDs.length == correctAnswersIDs.length;
    if (correct) {
      correctAnswersIDs.sort();
      questionAnswersIDs.sort();
      let i = 0;
      while (correct && i < questionAnswersIDs.length) {
        correct = correctAnswersIDs[i] == questionAnswersIDs[i];
        i++;
      }
    }
    return correct;
  }

  checkOrderQuestion(
    correctIDsOrder: number[],
    questionAnswerIDsOrder: number[],
  ): boolean {
    let correct = true;
    let i = 0;
    while (correct && i < correctIDsOrder.length) {
      correct = correctIDsOrder[i] != questionAnswerIDsOrder[i];
      i++;
    }
    return correct;
  }

  checkTextQuestion(correctAnswers: string[], questionAnswer: string): boolean {
    return (
      correctAnswers.find((answer) => questionAnswer == answer) != undefined
    );
  }

  visitTestEntity(test: TestEntity): void {
    test.choiceQuestions.forEach((question) => {
      question.accept(this);
    });

    test.orderQuestions.forEach((question) => {
      question.accept(this);
    });

    test.textQuestions.forEach((question) => {
      question.accept(this);
    });
  }

  visitSingleChoiceQuestionEntity(question: SingleChoiceQuestionEntity): void {
    const questionAnswer = this.answers.singleChoiceQuestionsAnswers.find(
      (answer) => answer.questionID == question.id,
    );
    const result = new SingleChoiceQuestionResult(
      question.id,
      false,
      question.answers.find((answer) => answer.correct).id,
    );
    if (questionAnswer != undefined) {
      result.correct = result.correctAnswerID == questionAnswer.answerID;
    }
    if (result.correct) {
      this.testResults.numberOfCorrect++;
    }
    this.testResults.singleChoiceQuestionResults.push(result);
  }

  visitMultipleChoiceQuestionEntity(
    question: MultipleChoiceQuestionEntity,
  ): void {
    const result = new MultipleChoiceQuestionResult(question.id, false, []);
    question.answers
      .filter((answer) => answer.correct == true)
      .forEach((correctAnswer) => {
        result.correctAnswersIDs.push(correctAnswer.id);
      });
    const questionAnswer = this.answers.multipleChoiceQuestionsAnswers.find(
      (answer) => (answer.questionID = question.id),
    );
    if (questionAnswer != undefined) {
      result.correct = this.checkMultipleChoiceQuestion(
        result.correctAnswersIDs,
        questionAnswer.answersIDs,
      );
    }
    if (result.correct) {
      this.testResults.numberOfCorrect++;
    }
    this.testResults.multipleChoiceQuestionResults.push(result);
  }

  visitChoiceAnswerEntity(choiceAnswer: ChoiceAnswerEntity): void {}

  visitOrderQuestionEntity(question: OrderQuestionEntity): void {
    const result = new OrderQuestionResult();
    result.questionID = question.id;
    result.correctAnswersIDsOrder = [];
    question.answers.forEach((correctAnswer) => {
      result.correctAnswersIDsOrder.push(correctAnswer.id);
    });
    const questionAnswer = this.answers.orderQuestionsAnswers.find(
      (answer) => (answer.questionID = question.id),
    );
    if (questionAnswer != undefined) {
      result.correct = this.checkOrderQuestion(
        result.correctAnswersIDsOrder,
        questionAnswer.answersIDsOrder,
      );
    } else {
      result.correct = false;
    }
    this.testResults.numberOfCorrect += result.correct ? 1 : 0;
    this.testResults.orderQuestionResults.push(result);
  }

  visitOrderAnswerEntity(orderAnswer: OrderAnswerEntity): void {}

  visitTextQuestionEntity(question: TextQuestionEntity): void {
    const result = new TextQuestionResult(question.id, false, []);
    const questionAnswer = this.answers.textQuestionsAnswers.find(
      (answer) => (answer.questionID = question.id),
    );
    if (questionAnswer != undefined) {
      question.answers.forEach((answer) => {
        result.correctAnswers.push(answer.correct);
      });
      result.correct = this.checkTextQuestion(
        result.correctAnswers,
        questionAnswer.answer,
      );
    }
    if (result.correct) {
      this.testResults.numberOfCorrect++;
    }
    this.testResults.textQuestionResults.push(result);
  }

  visitTextAnswerEntity(textAnswer: TextAnswerEntity): void {}

  visitTestQL(test: TestQL): void {
    test.singleChoiceQuestions.forEach((question) => {
      question.accept(this);
    });

    test.multipleChoiceQuestions.forEach((question) => {
      question.accept(this);
    });

    test.orderQuestions.forEach((question) => {
      question.accept(this);
    });

    test.textQuestions.forEach((question) => {
      question.accept(this);
    });
  }

  visitSingleChoiceQuestionQL(question: SingleChoiceQuestionQL): void {
    const questionAnswer = this.answers.singleChoiceQuestionsAnswers.find(
      (answer) => answer.questionID == question.id,
    );
    const result = new SingleChoiceQuestionResult(
      question.id,
      false,
      question.choiceAnswers.find((answer) => answer.correct).id,
    );
    if (questionAnswer != undefined) {
      result.correct = result.correctAnswerID == questionAnswer.answerID;
    }
    if (result.correct) {
      this.testResults.numberOfCorrect++;
    }
    this.testResults.singleChoiceQuestionResults.push(result);
  }

  visitMultipleChoiceQuestionQL(question: MultipleChoiceQuestionQL): void {
    const result = new MultipleChoiceQuestionResult(question.id, false, []);
    question.choiceAnswers
      .filter((answer) => answer.correct == true)
      .forEach((correctAnswer) => {
        result.correctAnswersIDs.push(correctAnswer.id);
      });
    const questionAnswer = this.answers.multipleChoiceQuestionsAnswers.find(
      (answer) => (answer.questionID = question.id),
    );
    if (questionAnswer != undefined) {
      result.correct = this.checkMultipleChoiceQuestion(
        result.correctAnswersIDs,
        questionAnswer.answersIDs,
      );
    }
    if (result.correct) {
      this.testResults.numberOfCorrect++;
    }
    this.testResults.multipleChoiceQuestionResults.push(result);
  }

  visitChoiceAnswerQL(choiceAnswer: ChoiceAnswerQL): void {}

  visitOrderQuestionQL(question: OrderQuestionQL): void {
    const result = new OrderQuestionResult(question.id, false, []);
    question.orderAnswers.forEach((correctAnswer) => {
      result.correctAnswersIDsOrder.push(correctAnswer.id);
    });
    const questionAnswer = this.answers.orderQuestionsAnswers.find(
      (answer) => (answer.questionID = question.id),
    );
    if (questionAnswer != undefined) {
      result.correct = this.checkOrderQuestion(
        result.correctAnswersIDsOrder,
        questionAnswer.answersIDsOrder,
      );
    }
    if (result.correct) {
      this.testResults.numberOfCorrect++;
    }
    this.testResults.orderQuestionResults.push(result);
  }
  visitOrderAnswerQL(orderAnswer: OrderAnswerQL): void {}

  visitTextQuestionQL(question: TextQuestionQL): void {
    const result = new TextQuestionResult(question.id, false, []);
    question.textAnswers.forEach((answer) => {
      result.correctAnswers.push(answer.correct);
    });
    const questionAnswer = this.answers.textQuestionsAnswers.find(
      (answer) => (answer.questionID = question.id),
    );
    if (questionAnswer != undefined) {
      result.correct = this.checkTextQuestion(
        result.correctAnswers,
        questionAnswer.answer,
      );
    }
    if (result.correct) {
      this.testResults.numberOfCorrect++;
    }
    this.testResults.textQuestionResults.push(result);
  }

  visitTextAnswerQL(textAnswer: TextAnswerQL): void {}

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
