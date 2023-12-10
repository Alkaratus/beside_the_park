import { DatabaseTest as TestEntity } from '../DataBase/Database.Test';
import { AbstractTest as AbstractTest } from '../Abstracts/Abstract.Test';
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
import { NOT_APPLICABLE_ERROR } from '../Errors/Error.Codes';
import { ResultMultipleChoiceQuestion } from '../GraphQLSchemas/Results/Result.MultipleChoiceQuestion';
import { ResultOrderQuestion } from '../GraphQLSchemas/Results/Result.OrderQuestion';
import { ResultSingleChoiceQuestion } from '../GraphQLSchemas/Results/Result.SingleChoiceQuestion';
import { QuestionAnswerTestAnswers } from '../GraphQLSchemas/QuestionAnswers/QuestionAnswer.TestAnswers';
import { ResultTest } from '../GraphQLSchemas/Results/Result.Test';
import { ResultTextQuestion } from '../GraphQLSchemas/Results/Result.TextQuestion';

export class CheckerTest implements AbstractVisitor {
  testResults: ResultTest;
  answers: QuestionAnswerTestAnswers;
  checkTestAnswers(test: AbstractTest, answers: QuestionAnswerTestAnswers): ResultTest {
    this.testResults = new ResultTest();
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
    const result = new ResultSingleChoiceQuestion(
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
    const result = new ResultMultipleChoiceQuestion(question.id, false, []);
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
    const result = new ResultOrderQuestion();
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
    const result = new ResultTextQuestion(question.id, false, []);
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
    const result = new ResultSingleChoiceQuestion(
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
    const result = new ResultMultipleChoiceQuestion(question.id, false, []);
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
    const result = new ResultOrderQuestion(question.id, false, []);
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
    const result = new ResultTextQuestion(question.id, false, []);
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
