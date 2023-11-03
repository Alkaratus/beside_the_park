
import {TestChecker} from "../src/TestChecker/TestChecker";
import {SingleChoiceQuestion} from "../src/GraphQLSchemas/Test/SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "../src/GraphQLSchemas/Test/MultipleChoiceQuestion";
import {OrderQuestion} from "../src/GraphQLSchemas/Test/OrderQuestion";
import {TextQuestion} from "../src/GraphQLSchemas/Test/TextQuestion";
import {ChoiceAnswer} from "../src/GraphQLSchemas/Test/ChoiceAnswer";
import {OrderAnswer} from "../src/GraphQLSchemas/Test/OrderAnswer";
import {TextAnswer} from "../src/GraphQLSchemas/Test/TextAnswer";


const testChecker= new TestChecker();

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