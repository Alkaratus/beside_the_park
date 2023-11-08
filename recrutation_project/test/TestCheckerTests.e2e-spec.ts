import {TestChecker} from "../src/TestChecker/TestChecker";
import {SingleChoiceQuestion} from "../src/GraphQLSchemas/Test/SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "../src/GraphQLSchemas/Test/MultipleChoiceQuestion";
import {OrderQuestion} from "../src/GraphQLSchemas/Test/OrderQuestion";
import {TextQuestion} from "../src/GraphQLSchemas/Test/TextQuestion";
import {ChoiceAnswer} from "../src/GraphQLSchemas/Test/ChoiceAnswer";
import {OrderAnswer} from "../src/GraphQLSchemas/Test/OrderAnswer";
import {TextAnswer} from "../src/GraphQLSchemas/Test/TextAnswer";
import {TestAnswers} from "../src/GraphQLSchemas/QuestionAnswers/TestAnswers";
import {TestResults} from "../src/GraphQLSchemas/Results/TestResults";


const testChecker= new TestChecker();
testChecker.testResults= new TestResults();
testChecker.testResults.numberOfCorrect=0;
testChecker.testResults.singleChoiceQuestionResults=[]
testChecker.testResults.multipleChoiceQuestionResults=[]
testChecker.testResults.orderQuestionResults=[]
testChecker.testResults.textQuestionResults=[]
testChecker.answers=new TestAnswers()
testChecker.answers.singleChoiceQuestionsAnswers=[]
testChecker.answers.multipleChoiceQuestionsAnswers=[]
testChecker.answers.orderQuestionsAnswers=[]
testChecker.answers.textQuestionsAnswers=[]

const testSingleChoiceQuestion=new SingleChoiceQuestion()
testSingleChoiceQuestion.id=1;
testSingleChoiceQuestion.content="";
testSingleChoiceQuestion.choiceAnswers=[
    new ChoiceAnswer(1,"",true),
    new ChoiceAnswer(2,"",false),
];

const testMultipleChoiceQuestion=new MultipleChoiceQuestion()
testMultipleChoiceQuestion.id=1;
testMultipleChoiceQuestion.content="";
testMultipleChoiceQuestion.choiceAnswers=[
    new ChoiceAnswer(1,"",true),
    new ChoiceAnswer(2,"",false),
    new ChoiceAnswer(3,"",false),
    new ChoiceAnswer(4,"",true),
    new ChoiceAnswer(5,"",false),
];

const testOrderQuestion= new OrderQuestion()
testOrderQuestion.id=1;
testOrderQuestion.content=""
testOrderQuestion.orderAnswers=[
    new OrderAnswer(1, "",1),
    new OrderAnswer(2, "",2),
    new OrderAnswer(3, "",3),
];

const testTextQuestion= new TextQuestion();
testTextQuestion.id=1;
testTextQuestion.content="";
testTextQuestion.textAnswers=[
    new TextAnswer(1,"a")
]

describe("Test Checker Test",()=>{
    it("Check correct single question answer",()=>{
        testChecker.answers.singleChoiceQuestionsAnswers.push({questionID:1,answerID:1})
        testSingleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.singleChoiceQuestionResults[0]
        expect(result.correct)
        //expect(result.correctAnswerID).toBeNull()
    })

    it("Check incorrect single question answer",()=>{
        testChecker.answers.singleChoiceQuestionsAnswers.push({questionID:1,answerID:1})
        testSingleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.singleChoiceQuestionResults[0]
        expect(!result.correct)
        expect(result.correctAnswerID).toBe(1);
    })

    it("Check correct multiple question answer",()=>{
        testChecker.answers.multipleChoiceQuestionsAnswers.push({questionID:1,answersIDs:[1,4]})
        testMultipleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.multipleChoiceQuestionResults[0]
        expect(result.correct)
        //expect(result.correctAnswersIDs).toBeNull()
    })

    it("Check incorrect number multiple question answer",()=>{
        testChecker.answers.multipleChoiceQuestionsAnswers.push({questionID:1,answersIDs:[1]})
        testMultipleChoiceQuestion.accept(testChecker);
        let result= testChecker.testResults.multipleChoiceQuestionResults[0]
        expect(!result.correct)
        expect(result.correctAnswersIDs.length).toBe(2);
    })

    it("Check incorrect answers multiple question answer",()=>{
        testChecker.answers.multipleChoiceQuestionsAnswers.push({questionID:1,answersIDs:[1,2]})
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
        //expect(result.correctAnswersIDsOrder).toBeNull()
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
        //expect(result.correctAnswersIDs).toBeNull()
    })

    it("Check incorrect text question answer",()=>{
        testChecker.answers.textQuestionsAnswers.push({questionID:1,answer:"a"});
        testTextQuestion.accept(testChecker);
        let result= testChecker.testResults.textQuestionResults[0]
        expect(!result.correct)
        expect(result.correctAnswersIDs.join()).toBe([1].join())
    })

})