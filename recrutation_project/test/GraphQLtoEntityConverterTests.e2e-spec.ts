import {GraphQLInputToEntityConverter} from "../src/Converters/GraphQLInputToEntityConverter";
import {
    NewChoiceAnswer,
    NewMultipleChoiceQuestion, NewOrderAnswer,
    NewOrderQuestion,
    NewSingleChoiceQuestion, NewTextAnswer,
    NewTextQuestion
} from "../src/graphql";

const dtoToEntityConverter: GraphQLInputToEntityConverter= new GraphQLInputToEntityConverter();

const testSingleChoiceQuestion= new NewSingleChoiceQuestion();
testSingleChoiceQuestion.content="";

const testMultipleChoiceQuestion= new NewMultipleChoiceQuestion();
testMultipleChoiceQuestion.content=""

const testOrderQuestion= new NewOrderQuestion();
testOrderQuestion.content="";

const testTextQuestion= new NewTextQuestion();
testTextQuestion.content="";

describe("GraphQL to Entity Converter Tests",()=>{
    it("Convert Single Choice Question",()=>{
        testSingleChoiceQuestion.answers=[
            {content:"",correct:false},
            {content:"",correct:true},
            {content:"",correct:false},
            {content:"",correct:false}
        ];
        let convertedQuestion=dtoToEntityConverter.convertSingleChoiceQuestion(testSingleChoiceQuestion);
        expect(convertedQuestion.answers.length).toBe(testSingleChoiceQuestion.answers.length);
        expect(convertedQuestion.content).toBe(testSingleChoiceQuestion.content)
    })

    it("Convert Multiple Choice Question",()=>{
        testMultipleChoiceQuestion.answers=[
            {content:"",correct:true},
            {content:"",correct:false},
            {content:"",correct:true},
            {content:"",correct:true}
        ];
        let convertedQuestion=dtoToEntityConverter.convertMultipleChoiceQuestion(testMultipleChoiceQuestion);
        expect(convertedQuestion.answers.length).toBe(testMultipleChoiceQuestion.answers.length);
        expect(convertedQuestion.content).toBe(testMultipleChoiceQuestion.content)
    })

    it("Convert order question",()=>{
        testOrderQuestion.answers=[
            {content:"",order:1},
            {content:"",order:2},
            {content:"",order:3},
        ]
        let convertedQuestion=dtoToEntityConverter.convertOrderQuestion(testOrderQuestion);
        expect(convertedQuestion.answers.length).toBe(testOrderQuestion.answers.length)
        expect(convertedQuestion.content).toBe(testOrderQuestion.content)
    })

    it("Convert text question",()=>{
        testTextQuestion.answers=[
            {correct:""},
            {correct:""},
        ]
        let convertedQuestion=dtoToEntityConverter.convertTextQuestion(testTextQuestion);
        expect(convertedQuestion.answers.length).toBe(testTextQuestion.answers.length)
        expect(convertedQuestion.content).toBe(testTextQuestion.content)
    })

    it("Not enough choice answers raise exception",()=>{
        testSingleChoiceQuestion.answers=[
            {content:"Paris",correct:true},
        ];
        let properErrorRaised=false;
        try{
            dtoToEntityConverter.convertSingleChoiceQuestion(testSingleChoiceQuestion);
        }
        catch(error){
            if(error=="Question have not enough answers"){
                properErrorRaised=true;
            }
        }
        expect(properErrorRaised);
    })

    it("Number of correct answers another than 1 for single choice questions raise exception",()=>{
        testSingleChoiceQuestion.answers=[
            {content:"",correct:true},
            {content:"",correct:true},
        ];
        let properErrorRaised=false;
        try{
            dtoToEntityConverter.convertSingleChoiceQuestion(testSingleChoiceQuestion);
        }
        catch(error){
            if(error=="Single choice question didn't have exactly one correct answer"){
                properErrorRaised=true;
            }
        }
        expect(properErrorRaised);
    })

    it("Not enough order choice answers raise exception",()=>{
        testOrderQuestion.answers=[
            {content:"Declaration of Independence",order:1},
        ]
        let properErrorRaised=false;
        try{
            dtoToEntityConverter.convertOrderQuestion(testOrderQuestion);
        }
        catch(error){
            if(error=="Question have not enough answers"){
                properErrorRaised=true;
            }
        }
        expect(properErrorRaised);
    })

    it("Not enough text answers raise exception",()=>{
        testTextQuestion.answers=[]
        let properErrorRaised=false;
        try{
            dtoToEntityConverter.convertTextQuestion(testTextQuestion);
        }
        catch(error){
            if(error=="Question have not enough answers"){
                properErrorRaised=true;
            }
        }
        expect(properErrorRaised);
    })

    it("Convert choice answer",()=>{
        let choiceAnswer= new NewChoiceAnswer()
        choiceAnswer.content="";
        choiceAnswer.correct=true
        let convertedAnswer= dtoToEntityConverter.convertChoiceAnswer(choiceAnswer);
        expect(convertedAnswer.correct).toBe(choiceAnswer.correct);
        expect(convertedAnswer.content).toBe(choiceAnswer.content);
    })

    it("Convert order answer",()=>{
        let orderAnswer= new NewOrderAnswer()
        orderAnswer.content="";
        orderAnswer.order=1;
        let convertedAnswer= dtoToEntityConverter.convertOrderAnswer(orderAnswer);
        expect(convertedAnswer.order).toBe(orderAnswer.order);
        expect(convertedAnswer.content).toBe(orderAnswer.content);
    })

    it("Convert text answer",()=>{
        let textAnswer= new NewTextAnswer();
        textAnswer.correct="May the force be with you";
        let convertedAnswer= dtoToEntityConverter.convertTextAnswer(textAnswer);
        expect(convertedAnswer.correct).toBe(textAnswer.correct);
    })

})