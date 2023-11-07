import {EntityToGraphQLConverter} from "../src/Converters/EntityToGraphQLConverter";
import {ChoiceQuestion} from "../src/DataBaseEntities/ChoiceQuestion";
import {ChoiceAnswer} from "../src/DataBaseEntities/ChoiceAnswer";
import {OrderQuestion} from "../src/DataBaseEntities/OrderQuestion";
import {OrderAnswer} from "../src/DataBaseEntities/OrderAnswer";
import {TextQuestion} from "../src/DataBaseEntities/TextQuestion";
import {TextAnswer} from "../src/DataBaseEntities/TextAnswer";
import {SingleChoiceQuestion} from "../src/DataBaseEntities/SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "../src/DataBaseEntities/MultipleChoiceQuestion";
import { Test } from "../src/GraphQLSchemas/Test/Test";

const entityToGraphQLConverter: EntityToGraphQLConverter= new EntityToGraphQLConverter();
entityToGraphQLConverter.convertedTest= new Test()


const testSingleChoiceQuestion= new SingleChoiceQuestion();
testSingleChoiceQuestion.id=1;
testSingleChoiceQuestion.content="";
testSingleChoiceQuestion.answers=[
    new ChoiceAnswer(1,"",false),
    new ChoiceAnswer(2, "", true)
]

const testMultipleChoiceQuestion= new MultipleChoiceQuestion()
testMultipleChoiceQuestion.id=1;
testMultipleChoiceQuestion.content="";
testMultipleChoiceQuestion.answers=[
    new ChoiceAnswer(1,"",true),
    new ChoiceAnswer(2, "", true),
    new ChoiceAnswer(3,"",false),
    new ChoiceAnswer(4, "", true)
]

describe("Entity to GraphQL Converter Tests",()=>{

    beforeEach(() => {
        entityToGraphQLConverter.convertedTest.singleChoiceQuestions=[]
        entityToGraphQLConverter.convertedTest.multipleChoiceQuestions=[]
        entityToGraphQLConverter.convertedTest.orderQuestions=[]
        entityToGraphQLConverter.convertedTest.textQuestions=[]
        entityToGraphQLConverter.convertedChoiceAnswers=[]
        entityToGraphQLConverter.convertedOrderAnswers=[]
        entityToGraphQLConverter.convertedTextAnswers=[]
    });

    it("Separation of Choice Questions",()=>{
        let choiceQuestions:ChoiceQuestion[]=[
            testSingleChoiceQuestion,
            testMultipleChoiceQuestion
        ]
        entityToGraphQLConverter.convertChoiceQuestions(choiceQuestions);
        expect(entityToGraphQLConverter.convertedTest.singleChoiceQuestions.length).toBe(1);
        expect(entityToGraphQLConverter.convertedTest.multipleChoiceQuestions.length).toBe(1);
    })

    it("Convert Choice Question",()=>{
        testSingleChoiceQuestion.accept(entityToGraphQLConverter);
        let convertedQuestion= entityToGraphQLConverter.convertedTest.singleChoiceQuestions[0]
        expect(convertedQuestion.id).toBe(testSingleChoiceQuestion.id)
        expect(convertedQuestion.content).toBe(testSingleChoiceQuestion.content)
        expect(convertedQuestion.choiceAnswers.length).toBe(testSingleChoiceQuestion.answers.length)
    })

    it("Convert Order Question",()=>{
        let orderQuestion= new OrderQuestion();
        orderQuestion.id=1;
        orderQuestion.content="Arrange the following events in chronological order";
        orderQuestion.answers=[
            new OrderAnswer(1,"",1),
            new OrderAnswer(2,"",2),
        ]
        orderQuestion.accept(entityToGraphQLConverter);
        let convertedQuestion= entityToGraphQLConverter.convertedTest.orderQuestions[0]
        expect(convertedQuestion.id).toBe(orderQuestion.id)
        expect(convertedQuestion.content).toBe(orderQuestion.content)
        expect(convertedQuestion.orderAnswers.length).toBe(orderQuestion.answers.length)
    })

    it("Convert Text Question",()=>{
        let textQuestion= new TextQuestion();
        textQuestion.id=1;
        textQuestion.content= "What is the famous phrase from Star Wars";
        textQuestion.answers=[
            new TextAnswer(1,"May the force be with you")
        ]
        textQuestion.accept(entityToGraphQLConverter)
        let convertedQuestion=entityToGraphQLConverter.convertedTest.textQuestions[0];
        expect(convertedQuestion.id).toBe(textQuestion.id)
        expect(convertedQuestion.content).toBe(textQuestion.content)
        expect(convertedQuestion.textAnswers.length).toBe(textQuestion.answers.length)
    })

    it("Convert Choice Answer",()=>{
        let choiceAnswer= new ChoiceAnswer(1,"",true);
        choiceAnswer.accept(entityToGraphQLConverter);
        let convertedAnswer= entityToGraphQLConverter.convertedChoiceAnswers[0]
        expect(convertedAnswer.id).toBe(choiceAnswer.id);
        expect(convertedAnswer.content).toBe(choiceAnswer.content);
        expect(convertedAnswer.correct).toBe(choiceAnswer.correct);
    })

    it("Convert Order Answer",()=>{
        let orderAnswer= new OrderAnswer(1,"",1);
        orderAnswer.accept(entityToGraphQLConverter);
        let convertedAnswer= entityToGraphQLConverter.convertedOrderAnswers[0]
        expect(convertedAnswer.id).toBe(orderAnswer.id);
        expect(convertedAnswer.content).toBe(orderAnswer.content);
        expect(convertedAnswer.order).toBe(orderAnswer.order);
    })

    it("Convert Text Answer",()=>{
        let textAnswer= new TextAnswer(1,"");
        textAnswer.accept(entityToGraphQLConverter)
        let convertedAnswer= entityToGraphQLConverter.convertedTextAnswers[0]
        expect(convertedAnswer.id).toBe(textAnswer.id);
        expect(convertedAnswer.correct).toBe(textAnswer.correct);
    })

})