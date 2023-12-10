import {ConverterEntityToGraphQL} from "../src/Converters/Converter.EntityToGraphQL";
import {DatabaseChoiceQuestion} from "../src/DataBase/Database.ChoiceQuestion";
import {DatabaseChoiceAnswer} from "../src/DataBase/Database.ChoiceAnswer";
import {DatabaseOrderQuestion} from "../src/DataBase/Database.OrderQuestion";
import {DatabaseOrderAnswer} from "../src/DataBase/Database.OrderAnswer";
import {DatabaseTextQuestion} from "../src/DataBase/Database.TextQuestion";
import {DatabaseTextAnswer} from "../src/DataBase/Database.TextAnswer";
import {DatabaseSingleChoiceQuestion} from "../src/DataBase/Database.SingleChoiceQuestion";
import {DatabaseMultipleChoiceQuestion} from "../src/DataBase/Database.MultipleChoiceQuestion";
import { Test } from "../src/GraphQLSchemas/Test/Test";

const entityToGraphQLConverter: ConverterEntityToGraphQL= new ConverterEntityToGraphQL();
entityToGraphQLConverter.convertedTest= new Test()


const testSingleChoiceQuestion= new DatabaseSingleChoiceQuestion(1,"",
    [
        new DatabaseChoiceAnswer(1,"",false),
        new DatabaseChoiceAnswer(2, "", true)
    ]
);

const testMultipleChoiceQuestion= new DatabaseMultipleChoiceQuestion(1,"",
    [
        new DatabaseChoiceAnswer(1,"",true),
        new DatabaseChoiceAnswer(2, "", true),
        new DatabaseChoiceAnswer(3,"",false),
        new DatabaseChoiceAnswer(4, "", true)
    ]
);

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
        let choiceQuestions:DatabaseChoiceQuestion[]=[
            testSingleChoiceQuestion,
            testMultipleChoiceQuestion
        ]
        entityToGraphQLConverter.convertChoiceQuestions(choiceQuestions);
        expect(entityToGraphQLConverter.convertedTest.singleChoiceQuestions.length).toBe(1);
        expect(entityToGraphQLConverter.convertedTest.multipleChoiceQuestions.length).toBe(1);
    })

    it("Convert Choice AbstractQuestion",()=>{
        testSingleChoiceQuestion.accept(entityToGraphQLConverter);
        let convertedQuestion= entityToGraphQLConverter.convertedTest.singleChoiceQuestions[0]
        expect(convertedQuestion.id).toBe(testSingleChoiceQuestion.id)
        expect(convertedQuestion.content).toBe(testSingleChoiceQuestion.content)
        expect(convertedQuestion.choiceAnswers.length).toBe(testSingleChoiceQuestion.answers.length)
    })

    it("Convert Order AbstractQuestion",()=>{
        let orderQuestion= new DatabaseOrderQuestion(1,"",
            [
            new DatabaseOrderAnswer(1,"",1),
            new DatabaseOrderAnswer(2,"",2),
            ]
        );
        orderQuestion.accept(entityToGraphQLConverter);
        let convertedQuestion= entityToGraphQLConverter.convertedTest.orderQuestions[0]
        expect(convertedQuestion.id).toBe(orderQuestion.id)
        expect(convertedQuestion.content).toBe(orderQuestion.content)
        expect(convertedQuestion.orderAnswers.length).toBe(orderQuestion.answers.length)
    })

    it("Convert Text AbstractQuestion",()=>{
        let textQuestion= new DatabaseTextQuestion(1,"",
            [
                new DatabaseTextAnswer(1,"May the force be with you")
            ]
        );
        textQuestion.accept(entityToGraphQLConverter)
        let convertedQuestion=entityToGraphQLConverter.convertedTest.textQuestions[0];
        expect(convertedQuestion.id).toBe(textQuestion.id)
        expect(convertedQuestion.content).toBe(textQuestion.content)
        expect(convertedQuestion.textAnswers.length).toBe(textQuestion.answers.length)
    })

    it("Convert Choice Answer",()=>{
        let choiceAnswer= new DatabaseChoiceAnswer(1,"",true);
        choiceAnswer.accept(entityToGraphQLConverter);
        let convertedAnswer= entityToGraphQLConverter.convertedChoiceAnswers[0]
        expect(convertedAnswer.id).toBe(choiceAnswer.id);
        expect(convertedAnswer.content).toBe(choiceAnswer.content);
        expect(convertedAnswer.correct).toBe(choiceAnswer.correct);
    })

    it("Convert Order Answer",()=>{
        let orderAnswer= new DatabaseOrderAnswer(1,"",1);
        orderAnswer.accept(entityToGraphQLConverter);
        let convertedAnswer= entityToGraphQLConverter.convertedOrderAnswers[0]
        expect(convertedAnswer.id).toBe(orderAnswer.id);
        expect(convertedAnswer.content).toBe(orderAnswer.content);
        expect(convertedAnswer.order).toBe(orderAnswer.order);
    })

    it("Convert Text Answer",()=>{
        let textAnswer= new DatabaseTextAnswer(1,"");
        textAnswer.accept(entityToGraphQLConverter)
        let convertedAnswer= entityToGraphQLConverter.convertedTextAnswers[0]
        expect(convertedAnswer.id).toBe(textAnswer.id);
        expect(convertedAnswer.correct).toBe(textAnswer.correct);
    })

})