import {Test as TestEntity} from "../DataBaseEntities/Test";
import {Test as TestQL} from "../GraphQLSchemas/Test/Test";
import {ChoiceQuestion as ChoiceQuestionEntity} from "../DataBaseEntities/ChoiceQuestion";
import {SingleChoiceQuestion as SingleChoiceQuestionEntity} from "../DataBaseEntities/SingleChoiceQuestion";
import {SingleChoiceQuestion as SingleChoiceQuestionQL} from "../GraphQLSchemas/Test/SingleChoiceQuestion";
import {MultipleChoiceQuestion as MultipleChoiceQuestionEntity} from "../DataBaseEntities/MultipleChoiceQuestion";
import {MultipleChoiceQuestion as MultipleChoiceQuestionQL} from "../GraphQLSchemas/Test/MultipleChoiceQuestion";
import {ChoiceAnswer as ChoiceAnswerEntity} from "../DataBaseEntities/ChoiceAnswer";
import {ChoiceAnswer as ChoiceAnswerQL} from "../GraphQLSchemas/Test/ChoiceAnswer";
import {OrderQuestion as OrderQuestionEntity} from "../DataBaseEntities/OrderQuestion";
import {OrderQuestion as OrderQuestionQL} from "../GraphQLSchemas/Test/OrderQuestion"
import {OrderAnswer as OrderAnswerEntity} from "../DataBaseEntities/OrderAnswer";
import {OrderAnswer as OrderAnswerQL} from "../GraphQLSchemas/Test/OrderAnswer";
import {TextQuestion as TextQuestionEntity} from "../DataBaseEntities/TextQuestion";
import {TextQuestion as TextQuestionQL} from "../GraphQLSchemas/Test/TextQuestion"
import {TextAnswer as TextAnswerEntity} from "../DataBaseEntities/TextAnswer";
import {TextAnswer as TextAnswerQL} from "../GraphQLSchemas/Test/TextAnswer";
import {NewTest} from "../GraphQLSchemas/NewTest/NewTest";
import {NewSingleChoiceQuestion} from "../GraphQLSchemas/NewTest/NewSingleChoiceQuestion";
import {NewMultipleChoiceQuestion} from "../GraphQLSchemas/NewTest/NewMultipleChoiceQuestion";
import {NewChoiceAnswer} from "../GraphQLSchemas/NewTest/NewChoiceAnswer";
import {NewOrderQuestion} from "../GraphQLSchemas/NewTest/NewOrderQuestion";
import {NewOrderAnswer} from "../GraphQLSchemas/NewTest/NewOrderAnswer";
import {NewTextQuestion} from "../GraphQLSchemas/NewTest/NewTextQuestion";
import {NewTextAnswer} from "../GraphQLSchemas/NewTest/NewTextAnswer";
import {Visitor} from "../Abstracts/Visitor";
import {NOT_APPLICABLE_ERROR} from "../Errors/ErrorCodes";


export class EntityToGraphQLConverter implements Visitor{
    convertedTest: TestQL;
    convertedChoiceAnswers: ChoiceAnswerQL[];
    convertedOrderAnswers: OrderAnswerQL[];
    convertedTextAnswers: TextAnswerQL[];

    convertTest(test:TestEntity):TestQL{
        this.convertedTest=new TestQL();
        this.convertedTest.singleChoiceQuestions=[]
        this.convertedTest.multipleChoiceQuestions=[]
        this.convertedTest.orderQuestions=[]
        this.convertedTest.textQuestions=[]
        test.accept(this);
        return this.convertedTest;
    }

    convertChoiceQuestions(choiceQuestions: ChoiceQuestionEntity[]):void{
        choiceQuestions.forEach((question)=>{
            question.accept(this);
        });
    }

    convertChoiceAnswers(choiceAnswers:ChoiceAnswerEntity[]){
        this.convertedChoiceAnswers=[];
        choiceAnswers.forEach((choiceAnswer)=>{
            choiceAnswer.accept(this);
        });
    }

    convertOrderQuestions(orderQuestions:OrderQuestionEntity[]){
        orderQuestions.forEach((question)=>{
            question.accept(this);
        });

    }

    convertOrderAnswers(orderAnswers:OrderAnswerEntity[]){
        this.convertedOrderAnswers=[];
        orderAnswers.forEach((orderAnswer)=>{
            orderAnswer.accept(this)
        })
    }

    convertTextQuestions(textQuestions:TextQuestionEntity[]){
        textQuestions.forEach((question)=>{
            question.accept(this);
        });
    }

    convertTextAnswers(textAnswers:TextAnswerEntity[]){
        this.convertedTextAnswers=[];
        textAnswers.forEach((textAnswer)=>{
            textAnswer.accept(this);
        })
    }

    visitTestEntity(test: TestEntity):void{
        this.convertedTest.id=test.id;
        this.convertedTest.name=test.name;
        this.convertChoiceQuestions(test.choiceQuestions)
        this.convertOrderQuestions(test.orderQuestions);
        this.convertTextQuestions(test.textQuestions);
    }
    visitSingleChoiceQuestionEntity(singleChoiceQuestion:SingleChoiceQuestionEntity):void{
        let convertedQuestion= new SingleChoiceQuestionQL();
        convertedQuestion.id= singleChoiceQuestion.id;
        convertedQuestion.content = singleChoiceQuestion.content;
        this.convertChoiceAnswers(singleChoiceQuestion.answers)
        convertedQuestion.choiceAnswers = this.convertedChoiceAnswers;
        this.convertedTest.singleChoiceQuestions.push(convertedQuestion);
    }
    
    visitMultipleChoiceQuestionEntity(multipleChoiceQuestion:MultipleChoiceQuestionEntity):void{
        let convertedQuestion= new MultipleChoiceQuestionQL();
        convertedQuestion.id= multipleChoiceQuestion.id;
        convertedQuestion.content = multipleChoiceQuestion.content;
        this.convertChoiceAnswers(multipleChoiceQuestion.answers)
        convertedQuestion.choiceAnswers = this.convertedChoiceAnswers;
        this.convertedTest.multipleChoiceQuestions.push(convertedQuestion);
    }

    visitChoiceAnswerEntity(answer:ChoiceAnswerEntity):void{
        let convertedAnswer: ChoiceAnswerQL= new ChoiceAnswerQL(answer.id,answer.content,answer.correct);
        this.convertedChoiceAnswers.push(convertedAnswer)
    }

    visitOrderQuestionEntity(orderQuestion:OrderQuestionEntity):void{
        let convertedQuestion: OrderQuestionQL= new OrderQuestionQL();
        convertedQuestion.id= orderQuestion.id;
        convertedQuestion.content = orderQuestion.content
        this.convertOrderAnswers(orderQuestion.answers);
        convertedQuestion.orderAnswers = this.convertedOrderAnswers
        this.convertedTest.orderQuestions.push(convertedQuestion);
    }

    visitOrderAnswerEntity(answer:OrderAnswerEntity):void{
        let convertedAnswer: OrderAnswerQL= new OrderAnswerQL(answer.id,answer.content,answer.order);
        this.convertedOrderAnswers.push(convertedAnswer)
    }

    visitTextQuestionEntity(textQuestion:TextQuestionEntity):void{
        let convertedQuestion: TextQuestionQL= new TextQuestionQL();
        convertedQuestion.id= textQuestion.id;
        convertedQuestion.content = textQuestion.content
        this.convertTextAnswers(textQuestion.answers);
        convertedQuestion.textAnswers = this.convertedTextAnswers;
        this.convertedTest.textQuestions.push(convertedQuestion);
    }

    visitTextAnswerEntity(answer:TextAnswerEntity):void{
        let convertedAnswer: TextAnswerQL= new TextAnswerQL(answer.id,answer.correct);
        this.convertedTextAnswers.push(convertedAnswer)
    }

    visitTestQL(test: TestQL):void{throw NOT_APPLICABLE_ERROR}
    visitSingleChoiceQuestionQL(singleChoiceQuestion:SingleChoiceQuestionQL):void{throw NOT_APPLICABLE_ERROR}
    visitMultipleChoiceQuestionQL(multipleChoiceQuestion:MultipleChoiceQuestionQL):void{throw NOT_APPLICABLE_ERROR}
    visitChoiceAnswerQL(choiceAnswer:ChoiceAnswerQL):void{throw NOT_APPLICABLE_ERROR}
    visitOrderQuestionQL(orderQuestion:OrderQuestionQL):void{throw NOT_APPLICABLE_ERROR}
    visitOrderAnswerQL(orderAnswer:OrderAnswerQL):void{throw NOT_APPLICABLE_ERROR}
    visitTextQuestionQL(textQuestion:TextQuestionQL):void{throw NOT_APPLICABLE_ERROR}
    visitTextAnswerQL(textAnswer:TextAnswerQL):void{throw NOT_APPLICABLE_ERROR}

    visitNewTest(test: NewTest):void{throw NOT_APPLICABLE_ERROR}
    visitNewSingleChoiceQuestion(singleChoiceQuestion:NewSingleChoiceQuestion):void{throw NOT_APPLICABLE_ERROR}
    visitNewMultipleChoiceQuestion(multipleChoiceQuestion:NewMultipleChoiceQuestion):void{throw NOT_APPLICABLE_ERROR}
    visitNewChoiceAnswer(choiceAnswer:NewChoiceAnswer):void{throw NOT_APPLICABLE_ERROR}
    visitNewOrderQuestion(orderChoiceQuestion:NewOrderQuestion):void{throw NOT_APPLICABLE_ERROR}
    visitNewOrderAnswer(orderAnswer:NewOrderAnswer):void{throw NOT_APPLICABLE_ERROR}
    visitNewTextQuestion(textQuestion:NewTextQuestion):void{throw NOT_APPLICABLE_ERROR}
    visitNewTextAnswer(textAnswer:NewTextAnswer):void{throw NOT_APPLICABLE_ERROR}
}