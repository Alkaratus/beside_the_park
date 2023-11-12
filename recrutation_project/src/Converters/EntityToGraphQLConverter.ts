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

    constructor(){
        this.setToDefault()
    }

    setToDefault(){
        this.convertedTest=new TestQL();
        this.convertedTest.singleChoiceQuestions=[]
        this.convertedTest.multipleChoiceQuestions=[]
        this.convertedTest.orderQuestions=[]
        this.convertedTest.textQuestions=[]
    }

    convertTest(test:TestEntity):TestQL{
        this.setToDefault()
        test.accept(this);
        return this.convertedTest;
    }

    resolveQuestions(choiceQuestions: ChoiceQuestionEntity[]):void{
        choiceQuestions.forEach((question,index,questions)=>{
            if(question.multiple){
                questions[index]=new MultipleChoiceQuestionEntity(question.id,question.content,question.answers)
            }
            else{
                questions[index]=new SingleChoiceQuestionEntity(question.id,question.content,question.answers)
            }
        })
    }

    convertChoiceQuestions(choiceQuestions: ChoiceQuestionEntity[]):void{
        this.resolveQuestions(choiceQuestions);
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

    visitSingleChoiceQuestionEntity(question:SingleChoiceQuestionEntity):void{
        this.convertChoiceAnswers(question.answers)
        this.convertedTest.singleChoiceQuestions.push(new SingleChoiceQuestionQL(question.id,question.content,this.convertedChoiceAnswers));
    }
    
    visitMultipleChoiceQuestionEntity(question:MultipleChoiceQuestionEntity):void{
        this.convertChoiceAnswers(question.answers)
        this.convertedTest.multipleChoiceQuestions.push(new MultipleChoiceQuestionQL(question.id,question.content,this.convertedChoiceAnswers));
    }

    visitChoiceAnswerEntity(answer:ChoiceAnswerEntity):void{
        let convertedAnswer: ChoiceAnswerQL= new ChoiceAnswerQL(answer.id,answer.content,answer.correct);
        this.convertedChoiceAnswers.push(convertedAnswer)
    }

    visitOrderQuestionEntity(question:OrderQuestionEntity):void{
        this.convertOrderAnswers(question.answers);
        this.convertedTest.orderQuestions.push(new OrderQuestionQL(question.id,question.content,this.convertedOrderAnswers));
    }

    visitOrderAnswerEntity(answer:OrderAnswerEntity):void{
        let convertedAnswer: OrderAnswerQL= new OrderAnswerQL(answer.id,answer.content,answer.order);
        this.convertedOrderAnswers.push(convertedAnswer)
    }

    visitTextQuestionEntity(question:TextQuestionEntity):void{
        this.convertTextAnswers(question.answers);
        this.convertedTest.textQuestions.push(new TextQuestionQL(question.id,question.content,this.convertedTextAnswers));
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