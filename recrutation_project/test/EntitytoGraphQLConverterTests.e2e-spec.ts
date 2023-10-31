import {EntityToGraphQLConverter} from "../src/Converters/EntityToGraphQLConverter";
import {ChoiceQuestion} from "../src/DataBaseEntities/ChoiceQuestion";
import {ChoiceAnswer} from "../src/DataBaseEntities/ChoiceAnswer";
import {OrderQuestion} from "../src/DataBaseEntities/OrderQuestion";
import {OrderAnswer} from "../src/DataBaseEntities/OrderAnswer";
import {TextQuestion} from "../src/DataBaseEntities/TextQuestion";
import {TextAnswer} from "../src/DataBaseEntities/TextAnswer";
import {SingleChoiceQuestion} from "../src/DataBaseEntities/SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "../src/DataBaseEntities/MultipleChoiceQuestion";

const entityToGraphQLConverter: EntityToGraphQLConverter= new EntityToGraphQLConverter();

const testSingleChoiceQuestion= new SingleChoiceQuestion();
testSingleChoiceQuestion.id=1;
testSingleChoiceQuestion.content="";
testSingleChoiceQuestion.answers=[
    {id:1, content:"", correct:false, question:null},
    {id:2, content:"", correct:true, question:null}
]

const testMultipleChoiceQuestion= new MultipleChoiceQuestion()
testMultipleChoiceQuestion.id=1;
testMultipleChoiceQuestion.content="";
testMultipleChoiceQuestion.answers=[
    {id:1, content:"", correct:true, question:null},
    {id:2, content:"", correct:true, question:null},
    {id:3, content:"", correct:false, question:null},
    {id:4, content:"", correct:true, question:null}
]

describe("Entity to GraphQL Converter Tests",()=>{

    it("Separation of Choice Questions",()=>{
        entityToGraphQLConverter.singleChoiceQuestions=[];
        entityToGraphQLConverter.multipleChoiceQuestions=[];
        let choiceQuestions:ChoiceQuestion[]=[
            testSingleChoiceQuestion,
            testMultipleChoiceQuestion
        ]
        entityToGraphQLConverter.convertChoiceQuestions(choiceQuestions);
        expect(entityToGraphQLConverter.singleChoiceQuestions.length).toBe(1);
        expect(entityToGraphQLConverter.multipleChoiceQuestions.length).toBe(1);
    })

    it("Convert Choice Question",()=>{
        let convertedQuestion= entityToGraphQLConverter.convertSingleChoiceQuestion(testSingleChoiceQuestion)
        expect(convertedQuestion.id).toBe(testSingleChoiceQuestion.id)
        expect(convertedQuestion.content).toBe(testSingleChoiceQuestion.content)
        expect(convertedQuestion.choiceAnswers.length).toBe(testSingleChoiceQuestion.answers.length)
    })

    it("Convert Order Question",()=>{
        let orderQuestion= new OrderQuestion();
        orderQuestion.id=1;
        orderQuestion.content="Arrange the following events in chronological order";
        orderQuestion.answers=[
            {id: 1, content: "Declaration of Independence", order: 1, question: null},
            {id: 2, content: "World War II", order: 2, question: null}
        ]
        let convertedQuestion= entityToGraphQLConverter.convertOrderQuestion(orderQuestion)
        expect(convertedQuestion.id).toBe(orderQuestion.id)
        expect(convertedQuestion.content).toBe(orderQuestion.content)
        expect(convertedQuestion.orderAnswers.length).toBe(orderQuestion.answers.length)
    })

    it("Convert Text Question",()=>{
        let textQuestion= new TextQuestion();
        textQuestion.id=1;
        textQuestion.content= "What is the famous phrase from Star Wars";
        textQuestion.answers=[
            {id:1, correct:"May the force be with you", question: null}
        ]
        let convertedQuestion=entityToGraphQLConverter.convertTextQuestion(textQuestion)
        expect(convertedQuestion.id).toBe(textQuestion.id)
        expect(convertedQuestion.content).toBe(textQuestion.content)
        expect(convertedQuestion.textAnswers.length).toBe(textQuestion.answers.length)
    })

    it("Convert Choice Answer",()=>{
        let choiceAnswer= new ChoiceAnswer();
        choiceAnswer.id=1;
        choiceAnswer.content="Amsterdam";
        choiceAnswer.correct=true;
        let convertedAnswer= entityToGraphQLConverter.convertChoiceAnswer(choiceAnswer)
        expect(convertedAnswer.id).toBe(choiceAnswer.id);
        expect(convertedAnswer.content).toBe(choiceAnswer.content);
        expect(convertedAnswer.correct).toBe(choiceAnswer.correct);
    })

    it("Convert Order Answer",()=>{
        let orderAnswer= new OrderAnswer();
        orderAnswer.id= 1
        orderAnswer.content= "Declaration of Independence";
        orderAnswer.order=1;
        let convertedAnswer= entityToGraphQLConverter.convertOrderAnswer(orderAnswer)
        expect(convertedAnswer.id).toBe(orderAnswer.id);
        expect(convertedAnswer.content).toBe(orderAnswer.content);
        expect(convertedAnswer.position).toBe(orderAnswer.order);
    })

    it("Convert Text Answer",()=>{
        let textAnswer= new TextAnswer();
        textAnswer.id= 1;
        textAnswer.correct="May the force be with you";
        let convertedAnswer= entityToGraphQLConverter.convertTextAnswer(textAnswer)
        expect(convertedAnswer.id).toBe(textAnswer.id);
        expect(convertedAnswer.correct).toBe(textAnswer.correct);
    })

})