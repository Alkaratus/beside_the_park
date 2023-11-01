
import {TestChecker} from "../src/TestChecker/TestChecker";
import {SingleChoiceQuestion} from "../src/GraphQLSchemas/Test/SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "../src/GraphQLSchemas/Test/MultipleChoiceQuestion";
import {OrderQuestion} from "../src/GraphQLSchemas/Test/OrderQuestion";
import {TextQuestion} from "../src/GraphQLSchemas/Test/TextQuestion";


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
    {id:1, content:"",order:1},
    {id:2, content:"",order:2},
    {id:3, content:"",order:3}
];

const testTextQuestion= new TextQuestion();
testTextQuestion.id=1;
testTextQuestion.content="";
testTextQuestion.textAnswers=[
    {id:1,correct:"a"}
]

describe("Test Checker Test",()=>{
    it("Check correct single question answer",()=>{
        let answer={questionID:1,answerID:1};
        let result =testChecker.checkSingleChoiceQuestionAnswer(testSingleChoiceQuestion,answer);
        expect(result.correct)
        expect(result.correctAnswerID).toBeNull()
    })

    it("Check incorrect single question answer",()=>{
        let answer={questionID:1,answerID:2};
        let result=testChecker.checkSingleChoiceQuestionAnswer(testSingleChoiceQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswerID).toBe(1);
    })

    it("Check correct multiple question answer",()=>{
        let answer={questionID:1,answersIDs:[1,4]};
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,answer);
        expect(result.correct)
        expect(result.correctAnswersIDs).toBeNull()
    })

    it("Check incorrect number multiple question answer",()=>{
        let answer={questionID:1,answersIDs:[1]};
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswersIDs.length).toBe(2);
    })

    it("Check incorrect answers multiple question answer",()=>{
        let answer={questionID:1,answersIDs:[1,2]}
        let result=testChecker.checkMultipleChoiceQuestionAnswer(testMultipleChoiceQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswersIDs.join()).toBe([1,4].join())

    })

    it("Check correct order question answer",()=>{
        let answer={questionID:1,answersIDsOrder:[1,2,3]};
        let result=testChecker.checkOrderQuestionAnswer(testOrderQuestion,answer);
        expect(result.correct)
        expect(result.correctAnswersIDsOrder).toBeNull()
    })

    it("Check incorrect order question answer",()=>{
        let answer={questionID:1,answersIDsOrder:[1,3,2]};
        let result=testChecker.checkOrderQuestionAnswer(testOrderQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswersIDsOrder.join()).toBe([1,2,3].join())
    })

    it("Check correct text question answer",()=>{
        let answer={questionID:1,answer:"a"};
        let result=testChecker.checkTextQuestionAnswer(testTextQuestion,answer);
        expect(result.correct)
        expect(result.correctAnswersIDs).toBeNull()
    })

    it("Check incorrect text question answer",()=>{
        let answer={questionID:1,answer:"s"};
        let result=testChecker.checkTextQuestionAnswer(testTextQuestion,answer);
        expect(!result.correct)
        expect(result.correctAnswersIDs.join()).toBe([1].join())
    })

})