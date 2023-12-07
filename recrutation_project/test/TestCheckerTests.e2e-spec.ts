import {CheckerTest} from "../src/TestChecker/Checker.Test";
import {TestSingleChoiceQuestion} from "../src/GraphQLSchemas/Test/Test.SingleChoiceQuestion";
import {TestMultipleChoiceQuestion} from "../src/GraphQLSchemas/Test/Test.MultipleChoiceQuestion";
import {TestOrderQuestion} from "../src/GraphQLSchemas/Test/Test.OrderQuestion";
import {TextQuestion} from "../src/GraphQLSchemas/Test/TextQuestion";
import {TestChoiceAnswer} from "../src/GraphQLSchemas/Test/Test.ChoiceAnswer";
import {TestOrderAnswer} from "../src/GraphQLSchemas/Test/Test.OrderAnswer";
import {TextAnswer} from "../src/GraphQLSchemas/Test/TextAnswer";
import {QuestionAnswerTestAnswers} from "../src/GraphQLSchemas/QuestionAnswers/QuestionAnswer.TestAnswers";
import {ResultTest} from "../src/GraphQLSchemas/Results/Result.Test";


const testChecker= new CheckerTest();
testChecker.testResults= new ResultTest();
testChecker.testResults.numberOfCorrect=0;
testChecker.testResults.singleChoiceQuestionResults=[]
testChecker.testResults.multipleChoiceQuestionResults=[]
testChecker.testResults.orderQuestionResults=[]
testChecker.testResults.textQuestionResults=[]
testChecker.answers=new QuestionAnswerTestAnswers()
testChecker.answers.singleChoiceQuestionsAnswers=[]
testChecker.answers.multipleChoiceQuestionsAnswers=[]
testChecker.answers.orderQuestionsAnswers=[]
testChecker.answers.textQuestionsAnswers=[]

const testSingleChoiceQuestion=new TestSingleChoiceQuestion(1,"",
    [
    new TestChoiceAnswer(1,"",true),
    new TestChoiceAnswer(2,"",false),
    ]
)

const testMultipleChoiceQuestion=new TestMultipleChoiceQuestion()
testMultipleChoiceQuestion.id=1;
testMultipleChoiceQuestion.content="";
testMultipleChoiceQuestion.choiceAnswers=[
    new TestChoiceAnswer(1,"",true),
    new TestChoiceAnswer(2,"",false),
    new TestChoiceAnswer(3,"",false),
    new TestChoiceAnswer(4,"",true),
    new TestChoiceAnswer(5,"",false),
];

const testOrderQuestion= new TestOrderQuestion()
testOrderQuestion.id=1;
testOrderQuestion.content=""
testOrderQuestion.orderAnswers=[
    new TestOrderAnswer(1, "",1),
    new TestOrderAnswer(2, "",2),
    new TestOrderAnswer(3, "",3),
];

const testTextQuestion= new TextQuestion();
testTextQuestion.id=1;
testTextQuestion.content="";
testTextQuestion.textAnswers=[
    new TextAnswer(1,"a")
]

describe("AbstractTest Checker AbstractTest",()=>{
    it("Check correct single question answer",()=>{
        testChecker.answers.singleChoiceQuestionsAnswers.push({questionID:1,answerID:1})
        testSingleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.singleChoiceQuestionResults[0]
        expect(result.correct)
        expect(result.correctAnswerID).toBe(1);
    })

    it("Check incorrect single question answer",()=>{
        testChecker.answers.singleChoiceQuestionsAnswers.push({questionID:1,answerID:1})
        testSingleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.singleChoiceQuestionResults[0]
        expect(!result.correct)
        expect(result.correctAnswerID).toBe(1);
    })

    it("Check correct multiple question answer",()=>{
        testChecker.answers.multipleChoiceQuestionsAnswers.push({questionID:1,answersIDs:[4,1]})
        testMultipleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.multipleChoiceQuestionResults[0]
        expect(result.correct)
        expect(result.correctAnswersIDs.join()).toBe([1,4].join());
    })

    it("Check incorrect number multiple question answer",()=>{
        testChecker.answers.multipleChoiceQuestionsAnswers.push({questionID:1,answersIDs:[1]})
        testMultipleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.multipleChoiceQuestionResults[0]
        expect(!result.correct)
        expect(result.correctAnswersIDs.length).toBe(2);
    })

    it("Check incorrect answers multiple question answer",()=>{
        testChecker.answers.multipleChoiceQuestionsAnswers.push({questionID:1,answersIDs:[2,1]})
        testMultipleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.multipleChoiceQuestionResults[0]
        expect(!result.correct)
        expect(result.correctAnswersIDs.join()).toBe([1,4].join())

    })

    it("Check correct order question answer",()=>{
        testChecker.answers.orderQuestionsAnswers.push({questionID:1,answersIDsOrder:[1,2,3]});
        testOrderQuestion.accept(testChecker);
        let result= testChecker.testResults.orderQuestionResults[0]
        expect(result.correct)
        expect(result.correctAnswersIDsOrder.join()).toBe([1,2,3].join())
    })

    it("Check incorrect order question answer",()=>{
        testChecker.answers.orderQuestionsAnswers.push({questionID:1,answersIDsOrder:[1,3,2]});
        testOrderQuestion.accept(testChecker);
        let result= testChecker.testResults.orderQuestionResults[0]
        expect(!result.correct)
        expect(result.correctAnswersIDsOrder.join()).toBe([1,2,3].join())
    })

    it("Check correct text question answer",()=>{
        testChecker.answers.textQuestionsAnswers.push({questionID:1,answer:"a"});
        testTextQuestion.accept(testChecker);
        let result= testChecker.testResults.textQuestionResults[0]
        expect(result.correct)
        expect(result.correctAnswers.join()).toBe(["a"].join())
    })

    it("Check incorrect text question answer",()=>{
        testChecker.answers.textQuestionsAnswers.push({questionID:1,answer:"s"});
        testTextQuestion.accept(testChecker);
        let result= testChecker.testResults.textQuestionResults[0]
        expect(!result.correct)
        expect(result.correctAnswers.join()).toBe(["a"].join())
    })

})