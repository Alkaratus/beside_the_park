import {EntityToGraphQLConverter} from "../src/Converters/EntityToGraphQLConverter";
import {ChoiceQuestion as ChoiceQuestionEntity} from "../src/DataBaseEntities/ChoiceQuestion";
import {ChoiceAnswer as ChoiceAnswerEntity} from "../src/DataBaseEntities/ChoiceAnswer";
import {OrderQuestion as OrderQuestionEntity} from "../src/DataBaseEntities/OrderQuestion";
import {OrderAnswer as OrderAnswerEntity} from "../src/DataBaseEntities/OrderAnswer";
import {TextQuestion as TextQuestionEntity} from "../src/DataBaseEntities/TextQuestion";
import {TextAnswer as TextAnswerEntity} from "../src/DataBaseEntities/TextAnswer";
import {SingleChoiceQuestion as SingleChoiceQuestionEntity} from "../src/DataBaseEntities/SingleChoiceQuestion";

const entityToGraphQLConverter: EntityToGraphQLConverter= new EntityToGraphQLConverter();


describe("Entity to GraphQL Converter Tests",()=>{

    it("Separation of Choice Questions",()=>{

    })

    it("Convert Choice Question",()=>{
        let choiceQuestion: ChoiceQuestionEntity= new SingleChoiceQuestionEntity();
        choiceQuestion.id=1;
        choiceQuestion.content="Arrange the following events in chronological order";
        choiceQuestion.answers=[
            {id:1, content:"London", correct:false, question:null},
            {id:2, content:"Paris", correct:true, question:null}
        ]
        let convertedQuestion= entityToGraphQLConverter.convertSingleChoiceQuestion(choiceQuestion)
        expect(convertedQuestion.id).toBe(choiceQuestion.id)
        expect(convertedQuestion.content).toBe(choiceQuestion.content)
        expect(convertedQuestion.choiceAnswers.length).toBe(choiceQuestion.answers.length)
    })

    it("Convert Order Question",()=>{
        let orderQuestion: OrderQuestionEntity= new OrderQuestionEntity();
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
        let textQuestion= new TextQuestionEntity();
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
        let choiceAnswer= new ChoiceAnswerEntity();
        choiceAnswer.id=1;
        choiceAnswer.content="Amsterdam";
        choiceAnswer.correct=true;
        let convertedAnswer= entityToGraphQLConverter.convertChoiceAnswer(choiceAnswer)
        expect(convertedAnswer.id).toBe(choiceAnswer.id);
        expect(convertedAnswer.content).toBe(choiceAnswer.content);
        expect(convertedAnswer.correct).toBe(choiceAnswer.correct);
    })

    it("Convert Order Answer",()=>{
        let orderAnswer= new OrderAnswerEntity();
        orderAnswer.id= 1
        orderAnswer.content= "Declaration of Independence";
        orderAnswer.order=1;
        let convertedAnswer= entityToGraphQLConverter.convertOrderAnswer(orderAnswer)
        expect(convertedAnswer.id).toBe(orderAnswer.id);
        expect(convertedAnswer.content).toBe(orderAnswer.content);
        expect(convertedAnswer.position).toBe(orderAnswer.order);
    })

    it("Convert Text Answer",()=>{
        let textAnswer= new TextAnswerEntity();
        textAnswer.id= 1;
        textAnswer.correct="May the force be with you";
        let convertedAnswer= entityToGraphQLConverter.convertTextAnswer(textAnswer)
        expect(convertedAnswer.id).toBe(textAnswer.id);
        expect(convertedAnswer.correct).toBe(textAnswer.correct);
    })

})