import {DTOToEntityConverter} from "../src/Converters/DTOToEntityConverter";
import {EntityToGraphQLConverter} from "../src/Converters/EntityToGraphQLConverter";
import {ChoiceAnswer as ChoiceAnswerDTO} from "../src/DTOs/ChoiceAnswer";
import {ChoiceQuestion as ChoiceQuestionDTO} from "../src/DTOs/ChoiceQuestion";
import {OrderQuestion as OrderQuestionDTO} from "../src/DTOs/OrderQuestion";
import {OrderAnswer as OrderAnswerDTO} from "../src/DTOs/OrderAnswer";
import {TextQuestion as TextQuestionDTO} from "../src/DTOs/TextQuestion";
import {TextAnswer as TextAnswerDTO} from "../src/DTOs/TextAnswer";
import {ChoiceQuestion as ChoiceQuestionEntity} from "../src/DataBaseEntities/ChoiceQuestion";
import {ChoiceAnswer as ChoiceAnswerEntity} from "../src/DataBaseEntities/ChoiceAnswer";
import {OrderQuestion as OrderQuestionEntity} from "../src/DataBaseEntities/OrderQuestion";
import {OrderAnswer as OrderAnswerEntity} from "../src/DataBaseEntities/OrderAnswer";
import {TextQuestion as TextQuestionEntity} from "../src/DataBaseEntities/TextQuestion";
import {TextAnswer as TextAnswerEntity} from "../src/DataBaseEntities/TextAnswer";


const dtoToEntityConverter: DTOToEntityConverter= new DTOToEntityConverter();
const entityToGraphQLConverter: EntityToGraphQLConverter= new EntityToGraphQLConverter();

describe("DTO to Entity Converter Tests",()=>{
    it("Convert Choice Question",()=>{
        let choiceQuestion: ChoiceQuestionDTO= new ChoiceQuestionDTO();
        choiceQuestion.content="What is the capital of France?";
        choiceQuestion.multiple=false;
        choiceQuestion.answers=[
            new ChoiceAnswerDTO("London",false),
            new ChoiceAnswerDTO("Paris",true),
            new ChoiceAnswerDTO("Rome",false),
            new ChoiceAnswerDTO("Madrid",false)
        ];
        let convertedQuestion=dtoToEntityConverter.convertChoiceQuestion(choiceQuestion);
        expect(convertedQuestion.answers.length).toBe(choiceQuestion.answers.length);
        expect(convertedQuestion.content).toBe(choiceQuestion.content)
        expect(convertedQuestion.multiple).toBe(choiceQuestion.multiple)
    })

    it("Convert order question",()=>{
        let orderQuestion: OrderQuestionDTO= new OrderQuestionDTO();
        orderQuestion.content="Arrange the following events in chronological order";
        orderQuestion.answers=[
            new OrderAnswerDTO("Declaration of Independence",1),
            new OrderAnswerDTO("World War II",2),
            new OrderAnswerDTO("First Moon Landing",3)
        ]
        let convertedQuestion=dtoToEntityConverter.convertOrderQuestion(orderQuestion);
        expect(convertedQuestion.answers.length).toBe(orderQuestion.answers.length)
        expect(convertedQuestion.content).toBe(orderQuestion.content)
    })

    it("Convert text question",()=>{
        let textQuestion: TextQuestionDTO= new TextQuestionDTO();
        textQuestion.content="What is the famous phrase from Star Wars";
        textQuestion.answers=[
            new TextAnswerDTO("May the force be with you"),
            new TextAnswerDTO("I have bad feelings about this")
        ]
        let convertedQuestion=dtoToEntityConverter.convertTextQuestion(textQuestion);
        expect(convertedQuestion.answers.length).toBe(textQuestion.answers.length)
        expect(convertedQuestion.content).toBe(textQuestion.content)
    })

    it("Not enough choice answers raise exception",()=>{
        let choiceQuestion: ChoiceQuestionDTO= new ChoiceQuestionDTO();
        choiceQuestion.content="What is the capital of France?";
        choiceQuestion.multiple=false;
        choiceQuestion.answers=[
            new ChoiceAnswerDTO("Paris",true),
        ];
        let properErrorRaised=false;
        try{
            dtoToEntityConverter.convertChoiceQuestion(choiceQuestion);
        }
        catch(error){
            if(error=="Question have not enough answers"){
                properErrorRaised=true;
            }
        }
        expect(properErrorRaised);
    })

    it("Number of correct answers another than 1 for single choice questions raise exception",()=>{
        let choiceQuestion: ChoiceQuestionDTO= new ChoiceQuestionDTO();
        choiceQuestion.content="What is the capital of Netherlands?";
        choiceQuestion.multiple=false;
        choiceQuestion.answers=[
            new ChoiceAnswerDTO("Amsterdam",true),
            new ChoiceAnswerDTO("Hag",true),
        ];
        let properErrorRaised=false;
        try{
            dtoToEntityConverter.convertChoiceQuestion(choiceQuestion);
        }
        catch(error){
            if(error=="Single choice question didn't have exactly one correct answer"){
                properErrorRaised=true;
            }
        }
        expect(properErrorRaised);
    })

    it("Not enough order choice answers raise exception",()=>{
        let orderQuestion: OrderQuestionDTO= new OrderQuestionDTO();
        orderQuestion.content="Arrange the following events in chronological order";
        orderQuestion.answers=[
            new OrderAnswerDTO("Declaration of Independence",1),
        ]
        let properErrorRaised=false;
        try{
            dtoToEntityConverter.convertOrderQuestion(orderQuestion);
        }
        catch(error){
            if(error=="Question have not enough answers"){
                properErrorRaised=true;
            }
        }
        expect(properErrorRaised);
    })

    it("Not enough text answers raise exception",()=>{
        let textQuestion: TextQuestionDTO= new TextQuestionDTO();
        textQuestion.content="What is the famous phrase from Star Wars";
        textQuestion.answers=[]
        let properErrorRaised=false;
        try{
            dtoToEntityConverter.convertTextQuestion(textQuestion);
        }
        catch(error){
            if(error=="Question have not enough answers"){
                properErrorRaised=true;
            }
        }
        expect(properErrorRaised);
    })

    it("Convert choice answer",()=>{
        let choiceAnswer: ChoiceAnswerDTO= new ChoiceAnswerDTO("Amsterdam",true)
        let convertedAnswer= dtoToEntityConverter.convertChoiceAnswer(choiceAnswer);
        expect(convertedAnswer.correct).toBe(choiceAnswer.correct);
        expect(convertedAnswer.content).toBe(choiceAnswer.content);
    })

    it("Convert order answer",()=>{
        let orderAnswer: OrderAnswerDTO= new OrderAnswerDTO("Declaration of Independence",1);
        let convertedAnswer= dtoToEntityConverter.convertOrderAnswer(orderAnswer);
        expect(convertedAnswer.order).toBe(orderAnswer.order);
        expect(convertedAnswer.content).toBe(orderAnswer.content);
    })

    it("Convert text answer",()=>{
        let textAnswer: TextAnswerDTO= new TextAnswerDTO("May the force be with you");
        let convertedAnswer= dtoToEntityConverter.convertTextAnswer(textAnswer);
        expect(convertedAnswer.correct).toBe(textAnswer.correct);
    })

})

describe("Entity to GraphQL Converter Tests",()=>{
    it("Convert Choice Question",()=>{
        let choiceQuestion: ChoiceQuestionEntity= new ChoiceQuestionEntity();
        choiceQuestion.id=1;
        choiceQuestion.content="Arrange the following events in chronological order";
        choiceQuestion.multiple=false;
        choiceQuestion.answers=[{
            id:1,
            content:"London",
            correct:false,
            question:null
        },{
            id:2,
            content:"Paris",
            correct:true,
            question:null
        }]
        let convertedQuestion= entityToGraphQLConverter.convertChoiceQuestion(choiceQuestion)
        expect(convertedQuestion.id).toBe(choiceQuestion.id)
        expect(convertedQuestion.content).toBe(choiceQuestion.content)
        expect(convertedQuestion.multiple).toBe(choiceQuestion.multiple)
        expect(convertedQuestion.answers.length).toBe(choiceQuestion.answers.length)
    })

    it("Convert Order Question",()=>{
        let orderQuestion: OrderQuestionEntity= new OrderQuestionEntity();
        orderQuestion.id=1;
        orderQuestion.content="Arrange the following events in chronological order";
        orderQuestion.answers=[{
                id: 1,
                content: "Declaration of Independence",
                order: 1,
                question: null
            }, {
                id: 2,
                content: "World War II",
                order: 2,
                question: null
            }
        ]
        let convertedQuestion= entityToGraphQLConverter.convertOrderQuestion(orderQuestion)
        expect(convertedQuestion.id).toBe(orderQuestion.id)
        expect(convertedQuestion.content).toBe(orderQuestion.content)
        expect(convertedQuestion.answers.length).toBe(orderQuestion.answers.length)
    })

    it("Convert Text Question",()=>{
        let textQuestion= new TextQuestionEntity();
        textQuestion.id=1;
        textQuestion.content= "What is the famous phrase from Star Wars";
        textQuestion.answers=[
            {
                id:1,
                correct:"May the force be with you",
                question: null
            }
        ]
        let convertedQuestion=entityToGraphQLConverter.convertTextQuestion(textQuestion)
        expect(convertedQuestion.id).toBe(textQuestion.id)
        expect(convertedQuestion.content).toBe(textQuestion.content)
        expect(convertedQuestion.answers.length).toBe(textQuestion.answers.length)
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