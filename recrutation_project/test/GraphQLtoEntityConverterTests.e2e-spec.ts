import { ConverterGraphQLInputToEntity } from '../src/Converters/Converter.GraphQLInputToEntity';
import { NewSingleChoiceQuestion } from '../src/GraphQLSchemas/NewTest/New.SingleChoiceQuestion';
import { NewMultipleChoiceQuestion } from '../src/GraphQLSchemas/NewTest/New.MultipleChoiceQuestion';
import { NewOrderQuestion } from '../src/GraphQLSchemas/NewTest/New.OrderQuestion';
import { NewTextQuestion } from '../src/GraphQLSchemas/NewTest/New.TextQuestion';
import { NewChoiceAnswer } from '../src/GraphQLSchemas/NewTest/New.ChoiceAnswer';
import { NewOrderAnswer } from '../src/GraphQLSchemas/NewTest/New.OrderAnswer';
import { NewTextAnswer } from '../src/GraphQLSchemas/NewTest/New.TextAnswer';
import { NewTest } from '../src/GraphQLSchemas/NewTest/New.Test';
import { AbstractResolver } from '../src/AbstractsResolvers/Abstract.Resolver';
import { DatabaseTest } from '../src/DataBase/Database.Test';
import {
  MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR,
  NO_QUESTIONS_ERROR,
  NOT_CONSISTENT_ORDER_NUMBERS_ERROR,
  NOT_ENOUGH_ANSWERS_ERROR,
  NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR,
} from '../src/Errors/Error.Codes';

const graphQLInputToEntityConverter: ConverterGraphQLInputToEntity =
  new ConverterGraphQLInputToEntity();
graphQLInputToEntityConverter.convertedTest = new DatabaseTest();

const abstractResolver: AbstractResolver = new AbstractResolver();

const test = new NewTest();

const testSingleChoiceQuestion = new NewSingleChoiceQuestion('');

const testMultipleChoiceQuestion = new NewMultipleChoiceQuestion('');

const testOrderQuestion = new NewOrderQuestion('');

const testTextQuestion = new NewTextQuestion('');

describe('GraphQL to Entity Converter Tests', () => {
  beforeEach(() => {
    graphQLInputToEntityConverter.convertedTest.setToDefault();
    graphQLInputToEntityConverter.convertedChoiceAnswers = [];
    graphQLInputToEntityConverter.convertedOrderAnswers = [];
    graphQLInputToEntityConverter.convertedTextAnswers = [];
  });

  it('Convert Single Choice AbstractQuestion', () => {
    testSingleChoiceQuestion.answers = [
      new NewChoiceAnswer('', false),
      new NewChoiceAnswer('', true),
      new NewChoiceAnswer('', false),
      new NewChoiceAnswer('', false),
    ];
    graphQLInputToEntityConverter.convertSingleChoiceQuestion(
      testSingleChoiceQuestion,
    );
    graphQLInputToEntityConverter.convertedTest.choiceQuestions[0].accept(
      abstractResolver,
    );
    const convertedQuestion = abstractResolver.singleChoiceQuestionEntity;
    expect(convertedQuestion.answers.length).toBe(
      testSingleChoiceQuestion.answers.length,
    );
    expect(convertedQuestion.content).toBe(testSingleChoiceQuestion.content);
  });

  it('Convert Multiple Choice AbstractQuestion', () => {
    testMultipleChoiceQuestion.answers = [
      new NewChoiceAnswer('', true),
      new NewChoiceAnswer('', false),
      new NewChoiceAnswer('', true),
      new NewChoiceAnswer('', true),
    ];
    graphQLInputToEntityConverter.convertMultipleChoiceQuestion(
      testMultipleChoiceQuestion,
    );
    graphQLInputToEntityConverter.convertedTest.choiceQuestions[0].accept(
      abstractResolver,
    );
    const convertedQuestion = abstractResolver.multipleChoiceQuestionEntity;
    expect(convertedQuestion.answers.length).toBe(
      testMultipleChoiceQuestion.answers.length,
    );
    expect(convertedQuestion.content).toBe(testMultipleChoiceQuestion.content);
  });

  it('Convert order question', () => {
    testOrderQuestion.answers = [
      new NewOrderAnswer('', 1),
      new NewOrderAnswer('', 2),
      new NewOrderAnswer('', 3),
    ];
    graphQLInputToEntityConverter.convertOrderQuestion(testOrderQuestion);
    graphQLInputToEntityConverter.convertedTest.orderQuestions[0].accept(
      abstractResolver,
    );
    const convertedQuestion = abstractResolver.orderQuestionEntity;
    expect(convertedQuestion.answers.length).toBe(
      testOrderQuestion.answers.length,
    );
    expect(convertedQuestion.content).toBe(testOrderQuestion.content);
  });

  it('Convert text question', () => {
    testTextQuestion.answers = [new NewTextAnswer('')];
    graphQLInputToEntityConverter.convertTextQuestion(testTextQuestion);
    graphQLInputToEntityConverter.convertedTest.textQuestions[0].accept(
      abstractResolver,
    );
    const convertedQuestion = abstractResolver.textQuestionEntity;
    expect(convertedQuestion.answers.length).toBe(
      testTextQuestion.answers.length,
    );
    expect(convertedQuestion.content).toBe(testTextQuestion.content);
  });

  it('No questions in test', () => {
    test.singleChoiceQuestions = [];
    test.multipleChoiceQuestions = [];
    test.orderQuestions = [];
    test.textQuestions = [];
    let errorCode = 0;
    try {
      graphQLInputToEntityConverter.convertTest(test);
    } catch (error) {
      errorCode = error;
    }
    expect(errorCode).toBe(NO_QUESTIONS_ERROR);
  });

  it('Not enough choice answers raise exception', () => {
    testSingleChoiceQuestion.answers = [new NewChoiceAnswer('', true)];
    let errorCode = 0;
    try {
      graphQLInputToEntityConverter.convertSingleChoiceQuestion(
        testSingleChoiceQuestion,
      );
    } catch (error) {
      errorCode = error;
    }
    expect(errorCode).toBe(NOT_ENOUGH_ANSWERS_ERROR);
  });

  it('Number of correct answers another than 1 for single choice questions raise exception', () => {
    testSingleChoiceQuestion.answers = [
      new NewChoiceAnswer('', true),
      new NewChoiceAnswer('', true),
    ];
    let errorCode = 0;
    try {
      graphQLInputToEntityConverter.convertSingleChoiceQuestion(
        testSingleChoiceQuestion,
      );
    } catch (error) {
      errorCode = error;
    }
    expect(errorCode).toBe(NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR);
  });

  it('Not enough order choice answers raise exception', () => {
    testOrderQuestion.answers = [
      new NewOrderAnswer('Declaration of Independence', 1),
    ];
    let errorCode = 0;
    try {
      graphQLInputToEntityConverter.convertOrderQuestion(testOrderQuestion);
    } catch (error) {
      errorCode = error;
    }
    expect(errorCode).toBe(NOT_ENOUGH_ANSWERS_ERROR);
  });

  it('Multiple questions with same order raise exception', () => {
    testOrderQuestion.answers = [
      new NewOrderAnswer('', 1),
      new NewOrderAnswer('', 2),
      new NewOrderAnswer('', 1),
    ];
    let errorCode = 0;
    try {
      graphQLInputToEntityConverter.convertOrderQuestion(testOrderQuestion);
    } catch (error) {
      errorCode = error;
    }
    expect(errorCode).toBe(MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR);
  });

  it('Not consistent order of order answers raise exception', () => {
    testOrderQuestion.answers = [
      new NewOrderAnswer('', 1),
      new NewOrderAnswer('', 2),
      new NewOrderAnswer('', 4),
    ];
    let errorCode = 0;
    try {
      graphQLInputToEntityConverter.convertOrderQuestion(testOrderQuestion);
    } catch (error) {
      errorCode = error;
    }
    expect(errorCode).toBe(NOT_CONSISTENT_ORDER_NUMBERS_ERROR);
  });

  it('Not enough text answers raise exception', () => {
    testTextQuestion.answers = [];
    let errorCode = 0;
    try {
      graphQLInputToEntityConverter.convertTextQuestion(testTextQuestion);
    } catch (error) {
      errorCode = error;
    }
    expect(errorCode).toBe(NOT_ENOUGH_ANSWERS_ERROR);
  });

  it('Convert choice answer', () => {
    const choiceAnswer = new NewChoiceAnswer('', true);
    graphQLInputToEntityConverter.convertChoiceAnswer(choiceAnswer);
    graphQLInputToEntityConverter.convertedChoiceAnswers[0].accept(
      abstractResolver,
    );
    const convertedAnswer = abstractResolver.choiceAnswerEntity;
    expect(convertedAnswer.correct).toBe(choiceAnswer.correct);
    expect(convertedAnswer.content).toBe(choiceAnswer.content);
  });

  it('Convert order answer', () => {
    const orderAnswer = new NewOrderAnswer('', 1);
    graphQLInputToEntityConverter.convertOrderAnswer(orderAnswer);
    graphQLInputToEntityConverter.convertedOrderAnswers[0].accept(
      abstractResolver,
    );
    const convertedAnswer = abstractResolver.orderAnswerEntity;
    expect(convertedAnswer.order).toBe(orderAnswer.order);
    expect(convertedAnswer.content).toBe(orderAnswer.content);
  });

  it('Convert text answer', () => {
    const textAnswer = new NewTextAnswer('');
    graphQLInputToEntityConverter.convertTextAnswer(textAnswer);
    graphQLInputToEntityConverter.convertedTextAnswers[0].accept(
      abstractResolver,
    );
    const convertedAnswer = abstractResolver.textAnswerEntity;
    expect(convertedAnswer.correct).toBe(textAnswer.correct);
  });
});
