import {
    GraphQLInputToEntityConverter
} from "../src/Converters/GraphQLInputToEntityConverter";
import {NewSingleChoiceQuestion} from "../src/GraphQLSchemas/NewTest/NewSingleChoiceQuestion";
import {NewMultipleChoiceQuestion} from "../src/GraphQLSchemas/NewTest/NewMultipleChoiceQuestion";
import {NewOrderQuestion} from "../src/GraphQLSchemas/NewTest/NewOrderQuestion";
import {NewTextQuestion} from "../src/GraphQLSchemas/NewTest/NewTextQuestion";
import {NewChoiceAnswer} from "../src/GraphQLSchemas/NewTest/NewChoiceAnswer";
import {NewOrderAnswer} from "../src/GraphQLSchemas/NewTest/NewOrderAnswer";
import {NewTextAnswer} from "../src/GraphQLSchemas/NewTest/NewTextAnswer";
import {NewTest} from "../src/GraphQLSchemas/NewTest/NewTest";
import {AbstractResolver} from "../src/AbstractsResolvers/AbstractResolver";
import { Test } from "../src/DataBaseEntities/Test";
import {
    MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR,
    NO_QUESTIONS_ERROR, NOT_CONSISTENT_ORDER_NUMBERS,
    NOT_ENOUGH_ANSWERS_ERROR,
    NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR
} from "../src/Errors/ErrorCodes";

const graphQLInputToEntityConverter: GraphQLInputToEntityConverter= new GraphQLInputToEntityConverter();
graphQLInputToEntityConverter.convertedTest= new Test();

const abstractResolver: AbstractResolver= new AbstractResolver();

const test= new NewTest();

const testSingleChoiceQuestion= new NewSingleChoiceQuestion("");

const testMultipleChoiceQuestion= new NewMultipleChoiceQuestion("");

const testOrderQuestion= new NewOrderQuestion("");

const testTextQuestion= new NewTextQuestion("");

describe("GraphQL to Entity Converter Tests",()=>{

    beforeEach(() => {
        graphQLInputToEntityConverter.convertedTest.setToDefault()
        graphQLInputToEntityConverter.convertedChoiceAnswers=[]
        graphQLInputToEntityConverter.convertedOrderAnswers=[]
        graphQLInputToEntityConverter.convertedTextAnswers=[]
    });

    it("Convert Single Choice Question",()=>{
        testSingleChoiceQuestion.answers=[
            new NewChoiceAnswer("",false),
            new NewChoiceAnswer("",true),
            new NewChoiceAnswer("",false),
            new NewChoiceAnswer("",false),
        ];
        testSingleChoiceQuestion.accept(graphQLInputToEntityConverter);
        graphQLInputToEntityConverter.convertedTest.choiceQuestions[0].accept(abstractResolver);
        let convertedQuestion= abstractResolver.singleChoiceQuestionEntity;
        expect(convertedQuestion.answers.length).toBe(testSingleChoiceQuestion.answers.length);
        expect(convertedQuestion.content).toBe(testSingleChoiceQuestion.content)
    })

    it("Convert Multiple Choice Question",()=>{
        testMultipleChoiceQuestion.answers=[
            new NewChoiceAnswer("",true),
            new NewChoiceAnswer("",false),
            new NewChoiceAnswer("",true),
            new NewChoiceAnswer("",true),
        ];
        testMultipleChoiceQuestion.accept(graphQLInputToEntityConverter);
        graphQLInputToEntityConverter.convertedTest.choiceQuestions[0].accept(abstractResolver);
        let convertedQuestion= abstractResolver.multipleChoiceQuestionEntity;
        expect(convertedQuestion.answers.length).toBe(testMultipleChoiceQuestion.answers.length);
        expect(convertedQuestion.content).toBe(testMultipleChoiceQuestion.content)
    })

    it("Convert order question",()=>{
        testOrderQuestion.answers=[
            new NewOrderAnswer("",1),
            new NewOrderAnswer("",2),
            new NewOrderAnswer("",3),
        ]
        testOrderQuestion.accept(graphQLInputToEntityConverter);
        graphQLInputToEntityConverter.convertedTest.orderQuestions[0].accept(abstractResolver);
        let convertedQuestion= abstractResolver.orderQuestionEntity;
        expect(convertedQuestion.answers.length).toBe(testOrderQuestion.answers.length)
        expect(convertedQuestion.content).toBe(testOrderQuestion.content)
    })

    it("Convert text question",()=>{
        testTextQuestion.answers=[
            new NewTextAnswer(""),
        ]
        testTextQuestion.accept(graphQLInputToEntityConverter);
        graphQLInputToEntityConverter.convertedTest.textQuestions[0].accept(abstractResolver);
        let convertedQuestion= abstractResolver.textQuestionEntity;
        expect(convertedQuestion.answers.length).toBe(testTextQuestion.answers.length)
        expect(convertedQuestion.content).toBe(testTextQuestion.content)
    })

    it("No questions in test",()=>{
        test.singleChoiceQuestions=[]
        test.multipleChoiceQuestions=[]
        test.orderQuestions=[]
        test.textQuestions=[]
        let errorCode=0;
        try {
            test.accept(graphQLInputToEntityConverter)
        }
        catch(error){
            errorCode=error;
        }
        expect(errorCode).toBe(NO_QUESTIONS_ERROR);
    })

    it("Not enough choice answers raise exception",()=>{
        testSingleChoiceQuestion.answers=[
            new NewChoiceAnswer("",true),
        ];
        let errorCode=0;
        try{
            testSingleChoiceQuestion.accept(graphQLInputToEntityConverter);
        }
        catch(error){
            errorCode=error
        }
        expect(errorCode).toBe(NOT_ENOUGH_ANSWERS_ERROR);
    })

    it("Number of correct answers another than 1 for single choice questions raise exception",()=>{
        testSingleChoiceQuestion.answers=[
            new NewChoiceAnswer("",true),
            new NewChoiceAnswer("",true),
        ];
        let errorCode=0;
        try{
            testSingleChoiceQuestion.accept(graphQLInputToEntityConverter);
        }
        catch(error){
            errorCode=error;
        }
        expect(errorCode).toBe(NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR);
    })

    it("Not enough order choice answers raise exception",()=>{
        testOrderQuestion.answers=[
            new NewOrderAnswer("Declaration of Independence",1)
        ]
        let errorCode=0;
        try{
            testOrderQuestion.accept(graphQLInputToEntityConverter);
        }
        catch(error){
            errorCode=error;
        }
        expect(errorCode).toBe(NOT_ENOUGH_ANSWERS_ERROR);
    })

    it("Multiple questions with same order raise exception",()=>{
        testOrderQuestion.answers=[
            new NewOrderAnswer("",1),
            new NewOrderAnswer("",2),
            new NewOrderAnswer("",1),
        ]
        let errorCode=0;
        try{
            testOrderQuestion.accept(graphQLInputToEntityConverter);
        }
        catch(error){
            errorCode=error;
        }
        expect(errorCode).toBe(MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR);
    })

    it("Not consistent order of order answers raise exception",()=>{
        testOrderQuestion.answers=[
            new NewOrderAnswer("",1),
            new NewOrderAnswer("",2),
            new NewOrderAnswer("",4),
        ]
        let errorCode=0;
        try{
            testOrderQuestion.accept(graphQLInputToEntityConverter);
        }
        catch(error){
            errorCode=error;
        }
        expect(errorCode).toBe(NOT_CONSISTENT_ORDER_NUMBERS);
    })

    it("Not enough text answers raise exception",()=>{
        testTextQuestion.answers=[]
        let errorCode=0;
        try{
            testTextQuestion.accept(graphQLInputToEntityConverter)
        }
        catch(error){
            errorCode=error;
        }
        expect(errorCode).toBe(NOT_ENOUGH_ANSWERS_ERROR);
    })

    it("Convert choice answer",()=>{
        let choiceAnswer= new NewChoiceAnswer("",true)
        choiceAnswer.accept(graphQLInputToEntityConverter);
        graphQLInputToEntityConverter.convertedChoiceAnswers[0].accept(abstractResolver)
        let convertedAnswer= abstractResolver.choiceAnswerEntity;
        expect(convertedAnswer.correct).toBe(choiceAnswer.correct);
        expect(convertedAnswer.content).toBe(choiceAnswer.content);
    })

    it("Convert order answer",()=>{
        let orderAnswer= new NewOrderAnswer("",1)
        orderAnswer.accept(graphQLInputToEntityConverter);
        graphQLInputToEntityConverter.convertedOrderAnswers[0].accept(abstractResolver)
        let convertedAnswer= abstractResolver.orderAnswerEntity;
        expect(convertedAnswer.order).toBe(orderAnswer.order);
        expect(convertedAnswer.content).toBe(orderAnswer.content);
    })

    it("Convert text answer",()=>{
        let textAnswer= new NewTextAnswer("");
        textAnswer.accept(graphQLInputToEntityConverter);
        graphQLInputToEntityConverter.convertedTextAnswers[0].accept(abstractResolver)
        let convertedAnswer= abstractResolver.textAnswerEntity;
        expect(convertedAnswer.correct).toBe(textAnswer.correct);
    })

})