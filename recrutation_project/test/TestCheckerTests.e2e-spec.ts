import {
    MultipleChoiceQuestion, OrderQuestion, SingleChoiceQuestion, TextQuestion,
    SingleChoiceQuestionAnswer,MultipleChoiceQuestionAnswer, OrderQuestionAnswer,TextQuestionAnswer
} from "../src/graphql"
import {TestChecker} from "../src/TestChecker/TestChecker";

const testChecker= new TestChecker();

const testSingleChoiceQuestion=new SingleChoiceQuestion()
testSingleChoiceQuestion.id=1;
testSingleChoiceQuestion.content="";
testSingleChoiceQuestion.choiceAnswers=[
    {id:1, content:"", correct:true},
    {id:2, content:"", correct:false}
];

const testMultipleChoiceQuestion=new MultipleChoiceQuestion()
testMultipleChoiceQuestion.id=1;
testMultipleChoiceQuestion.content="";
testMultipleChoiceQuestion.choiceAnswers=[
    {id:1, content:"", correct:true},
    {id:2, content:"", correct:false},
    {id:3, content:"", correct:false},
    {id:4, content:"", correct:true},
    {id:5, content:"", correct:false}
];

const testOrderQuestion= new OrderQuestion()
testOrderQuestion.id=1;
testOrderQuestion.content=""
testOrderQuestion.orderAnswers=[
    {id:1, content:"",position:1},
    {id:2, content:"",position:2},
    {id:3, content:"",position:3}
];

const testTextQuestion= new TextQuestion();
testTextQuestion.id=1;
testTextQuestion.content="";
testTextQuestion.textAnswers=[
    {id:1,correct:"a"}
]

const testSingleChoiceAnswer= new SingleChoiceQuestionAnswer();
testSingleChoiceAnswer.questionID=1;

const testMultipleChoiceAnswer= new MultipleChoiceQuestionAnswer();
testMultipleChoiceAnswer.questionID=1;

const testOrderAnswer= new OrderQuestionAnswer()
testOrderAnswer.questionID=1;

const testTextAnswer= new TextQuestionAnswer()
testTextAnswer.questionID=1;

describe("Test Checker Test",()=>{
    it("Check correct single question answer",()=>{
        testSingleChoiceAnswer.answerID=1
        let result =testChecker.checkSingleChoiceQuestionAnswer(testSingleChoiceQuestion,testSingleChoiceAnswer);
        expect(result.correct)
        expect(result.correctAnswerID).toBeNull()
    })

    it("Check incorrect single question answer",()=>{
        testSingleChoiceAnswer.answerID=2
        let result=testChecker.checkSingleChoiceQuestionAnswer(testSingleChoiceQuestion,testSingleChoiceAnswer);
        expect(!result.correct)
        expect(result.correctAnswerID).toBe(1);
    })

    it("Check correct multiple question answer",()=>{
        testMultipleChoiceAnswer.answersIDs=[1,4]
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,testMultipleChoiceAnswer);
        expect(result.correct)
        expect(result.correctAnswerID).toBeNull()
    })

    it("Check incorrect number multiple question answer",()=>{
        testMultipleChoiceAnswer.answersIDs=[1]
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,testMultipleChoiceAnswer);
        expect(!result.correct)
        expect(result.correctAnswerID.length).toBe(2);
    })

    it("Check incorrect answers multiple question answer",()=>{
        testMultipleChoiceAnswer.answersIDs=[1,2]
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,testMultipleChoiceAnswer);
        expect(!result.correct)
        expect(result.correctAnswerID.join()).toBe([1,4].join())

    })

    it("Check correct order question answer",()=>{
        testOrderAnswer.answersIDsOrder=[1,2,3];
        let result=testChecker.checkOrderQuestionAnswer(testOrderQuestion,testOrderAnswer);
        expect(result.correct)
        expect(result.correctAnswersIDOrder).toBeNull()
    })

    it("Check incorrect order question answer",()=>{
        testOrderAnswer.answersIDsOrder=[1,3,2];
        let result=testChecker.checkOrderQuestionAnswer(testOrderQuestion,testOrderAnswer);
        expect(!result.correct)
        expect(result.correctAnswersIDOrder.join()).toBe([1,2,3].join())
    })

    it("Check correct text question answer",()=>{
        testTextAnswer.answer="a";
        let result=testChecker.checkTextQuestionAnswer(testTextQuestion,testTextAnswer);
        expect(result.correct)
        expect(result.correctAnswersID).toBeNull()
    })

    it("Check incorrect text question answer",()=>{
        testTextAnswer.answer="s";
        let result=testChecker.checkTextQuestionAnswer(testTextQuestion,testTextAnswer);
        expect(!result.correct)
        expect(result.correctAnswersID.join()).toBe([1].join())
    })

})