import {
    ChoiceQuestion, OrderQuestion, TextQuestion,
} from "../src/graphql"
import {TestChecker} from "../src/TestChecker/TestChecker";
import {SingleChoiceQuestionAnswer} from "../src/TestChecker/Answers/SingleChoiceQuestionAnswer";
import {MultipleChoiceQuestionAnswer} from "../src/TestChecker/Answers/MultipleChoiceQuestionAnswer";
import {OrderQuestionAnswer} from "../src/TestChecker/Answers/OrderQuestionAnswer";
import {TextQuestionAnswer} from "../src/TestChecker/Answers/TextQuestionAnswer";

const testChecker= new TestChecker();

const testSingleChoiceQuestion=new ChoiceQuestion()
testSingleChoiceQuestion.id=1;
testSingleChoiceQuestion.multiple=false;
testSingleChoiceQuestion.content="";
testSingleChoiceQuestion.choiceAnswers=[
    {id:1, content:"", correct:true},
    {id:2, content:"", correct:false}
];

const testMultipleChoiceQuestion=new ChoiceQuestion()
testMultipleChoiceQuestion.id=1;
testMultipleChoiceQuestion.content="";
testMultipleChoiceQuestion.multiple=true;
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

describe("Test Checker Test",()=>{
    it("Check correct single question answer",()=>{
        let answer=new SingleChoiceQuestionAnswer(1,1);
        let result =testChecker.checkSingleChoiceQuestionAnswer(testSingleChoiceQuestion,answer);
        expect(result.correct)
        expect(result.correctAnswerID).toBeNull()
    })

    it("Check incorrect single question answer",()=>{
        let answer=new SingleChoiceQuestionAnswer(1,2);
        let result=testChecker.checkSingleChoiceQuestionAnswer(testSingleChoiceQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswerID).toBe(1);
    })

    it("Check correct multiple question answer",()=>{
        let answer=new MultipleChoiceQuestionAnswer(1,[1,4]);
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,answer);
        expect(result.correct)
        expect(result.correctAnswerID).toBeNull()
    })

    it("Check incorrect number multiple question answer",()=>{
        let answer=new MultipleChoiceQuestionAnswer(1,[1]);
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswerID.length).toBe(2);
    })

    it("Check incorrect answers multiple question answer",()=>{
        let answer=new MultipleChoiceQuestionAnswer(1,[1,2]);
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswerID.join()).toBe([1,4].join())

    })

    it("Check correct order question answer",()=>{
        let answer=new OrderQuestionAnswer(1,[1,2,3]);
        let result=testChecker.checkOrderQuestionAnswer(testOrderQuestion,answer);
        expect(result.correct)
        expect(result.correctAnswersIDOrder).toBeNull()
    })

    it("Check incorrect order question answer",()=>{
        let answer=new OrderQuestionAnswer(1,[1,3,2]);
        let result=testChecker.checkOrderQuestionAnswer(testOrderQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswersIDOrder.join()).toBe([1,2,3].join())
    })

    it("Check correct text question answer",()=>{
        let answer=new TextQuestionAnswer(1,"a");
        let result=testChecker.checkTextQuestionAnswer(testTextQuestion,answer);
        expect(result.correct)
        expect(result.correctAnswersID).toBeNull()
    })

    it("Check incorrect text question answer",()=>{
        let answer=new TextQuestionAnswer(1,"s");
        let result=testChecker.checkTextQuestionAnswer(testTextQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswersID.join()).toBe([1].join())
    })

})