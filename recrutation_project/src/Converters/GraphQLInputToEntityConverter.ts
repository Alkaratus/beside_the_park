import {Test as TestEntity} from "../DataBaseEntities/Test";
import {Test as TestQL} from "../GraphQLSchemas/Test/Test";
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
import {
    MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR,
    NO_QUESTIONS_ERROR,
    NOT_APPLICABLE_ERROR, NOT_CONSISTENT_ORDER_NUMBERS,
    NOT_ENOUGH_ANSWERS_ERROR,
    NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR
} from "../Errors/ErrorCodes";


export class GraphQLInputToEntityConverter implements Visitor{
    numberOfQuestions: number;
    convertedTest: TestEntity
    convertedChoiceAnswers: ChoiceAnswerEntity[];
    convertedOrderAnswers: OrderAnswerEntity[];
    convertedTextAnswers: TextAnswerEntity[];

    private checkOrderAnswersUniqueOrder(){
        this.convertedOrderAnswers.forEach((checkedQuestion)=>{
            let questionsWithSpecificOrderNumber=0
            this.convertedOrderAnswers.forEach((question)=>{
                questionsWithSpecificOrderNumber+=checkedQuestion.order==question.order?1:0
            })
            if(questionsWithSpecificOrderNumber!=1){
                throw MULTIPLE_ANSWERS_WITH_SAME_ORDER_ERROR;
            }
        })
    }

    private checkOrderAnswersConsistentOrder(){
        for(let i=0; i<this.convertedOrderAnswers.length;i++){
            if(!this.convertedOrderAnswers.some((answer)=> answer.order==i+1)){
                throw NOT_CONSISTENT_ORDER_NUMBERS
            }
        }
    }

    convertTest(test:NewTest):TestEntity{
        this.convertedTest= new TestEntity();
        this.convertedTest.setToDefault()
        this.visitNewTest(test)
        return this.convertedTest;
    }

    convertSingleChoiceQuestions(questions: NewSingleChoiceQuestion[]){
        questions.forEach((question)=>{
            this.visitNewSingleChoiceQuestion(question)
        });
    }

    convertMultipleChoiceQuestions(questions: NewMultipleChoiceQuestion[]){
        questions.forEach((question)=>{
            this.visitNewMultipleChoiceQuestion(question)
        });
    }

    convertChoiceAnswers(answers:NewChoiceAnswer[], multiple:boolean=false):void{
        this.convertedChoiceAnswers=[];
        let correctCounter=0;
        if(answers.length<2){
            throw NOT_ENOUGH_ANSWERS_ERROR;
        }
        answers.forEach((answer)=>{
            correctCounter+=answer.correct? 1:0;
            this.visitNewChoiceAnswer(answer);
        });
        if(!multiple && correctCounter!=1){
            throw NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR;
        }
    }

    convertOrderQuestions(orderQuestions:NewOrderQuestion[]){
        orderQuestions.forEach((question)=>{
            this.visitNewOrderQuestion(question)
        });
    }

    convertOrderAnswers(orderAnswers:NewOrderAnswer[]){
        this.convertedOrderAnswers=[]
        if(orderAnswers.length<2){
            throw NOT_ENOUGH_ANSWERS_ERROR;
        }
        orderAnswers.forEach((answer)=>{
            this.visitNewOrderAnswer(answer)
        })
        this.checkOrderAnswersUniqueOrder()
        this.checkOrderAnswersConsistentOrder()
    }

    convertTextQuestions(textQuestions:NewTextQuestion[]){
        textQuestions.forEach((question)=>{
            this.visitNewTextQuestion(question)
        });
    }

    convertTextAnswers(textAnswers:NewTextAnswer[]){
        this.convertedTextAnswers=[]
        if(textAnswers.length==0){
            throw NOT_ENOUGH_ANSWERS_ERROR;
        }
        textAnswers.forEach((answer)=>{
            this.visitNewTextAnswer(answer)
        })
    }

    visitTestEntity(test: TestEntity):void{ throw NOT_APPLICABLE_ERROR}
    visitSingleChoiceQuestionEntity(singleChoiceQuestion:SingleChoiceQuestionEntity):void{throw NOT_APPLICABLE_ERROR}
    visitMultipleChoiceQuestionEntity(multipleChoiceQuestion:MultipleChoiceQuestionEntity):void{throw NOT_APPLICABLE_ERROR}
    visitChoiceAnswerEntity(choiceAnswer:ChoiceAnswerEntity):void{throw NOT_APPLICABLE_ERROR}
    visitOrderQuestionEntity(orderQuestion:OrderQuestionEntity):void{throw NOT_APPLICABLE_ERROR}
    visitOrderAnswerEntity(orderAnswer:OrderAnswerEntity):void{throw NOT_APPLICABLE_ERROR}
    visitTextQuestionEntity(textQuestion:TextQuestionEntity):void{throw NOT_APPLICABLE_ERROR}
    visitTextAnswerEntity(textAnswer:TextAnswerEntity):void{throw NOT_APPLICABLE_ERROR}

    visitTestQL(test: TestQL):void{throw NOT_APPLICABLE_ERROR}
    visitSingleChoiceQuestionQL(singleChoiceQuestion:SingleChoiceQuestionQL):void{throw NOT_APPLICABLE_ERROR}
    visitMultipleChoiceQuestionQL(multipleChoiceQuestion:MultipleChoiceQuestionQL):void{throw NOT_APPLICABLE_ERROR}
    visitChoiceAnswerQL(choiceAnswer:ChoiceAnswerQL):void{throw NOT_APPLICABLE_ERROR}
    visitOrderQuestionQL(orderQuestion:OrderQuestionQL):void{throw NOT_APPLICABLE_ERROR}
    visitOrderAnswerQL(orderAnswer:OrderAnswerQL):void{throw NOT_APPLICABLE_ERROR}
    visitTextQuestionQL(textQuestion:TextQuestionQL):void{throw NOT_APPLICABLE_ERROR}
    visitTextAnswerQL(textAnswer:TextAnswerQL):void{throw NOT_APPLICABLE_ERROR}

    visitNewTest(test: NewTest):void{
        this.convertedTest.name=test.name;
        this.convertSingleChoiceQuestions(test.singleChoiceQuestions)
        this.convertMultipleChoiceQuestions(test.multipleChoiceQuestions)
        this.convertOrderQuestions(test.orderQuestions)
        this.convertTextQuestions(test.textQuestions)
        this.numberOfQuestions=this.convertedTest.choiceQuestions.length;
        this.numberOfQuestions+=this.convertedTest.orderQuestions.length;
        this.numberOfQuestions+=this.convertedTest.textQuestions.length;
        if (this.numberOfQuestions==0){
            throw NO_QUESTIONS_ERROR;
        }
    }

    visitNewSingleChoiceQuestion(singleChoiceQuestion:NewSingleChoiceQuestion):void{
        this.convertChoiceAnswers(singleChoiceQuestion.answers);
        this.convertedTest.choiceQuestions.push(new SingleChoiceQuestionEntity(null,singleChoiceQuestion.content,this.convertedChoiceAnswers));
    }

    visitNewMultipleChoiceQuestion(multipleChoiceQuestion:NewMultipleChoiceQuestion):void{
        this.convertChoiceAnswers(multipleChoiceQuestion.answers,true);
        this.convertedTest.choiceQuestions.push(new MultipleChoiceQuestionEntity(null,multipleChoiceQuestion.content,this.convertedChoiceAnswers));
    }

    visitNewChoiceAnswer(choiceAnswer:NewChoiceAnswer):void{
        this.convertedChoiceAnswers.push(new ChoiceAnswerEntity(null,choiceAnswer.content,choiceAnswer.correct))
    }

    visitNewOrderQuestion(question:NewOrderQuestion):void{
        this.convertOrderAnswers(question.answers);
        this.convertedTest.orderQuestions.push(new OrderQuestionEntity(null,question.content,this.convertedOrderAnswers));
    }

    visitNewOrderAnswer(orderAnswer:NewOrderAnswer):void{
        this.convertedOrderAnswers.push(new OrderAnswerEntity(null,orderAnswer.content,orderAnswer.order));
    }

    visitNewTextQuestion(textQuestion:NewTextQuestion):void{
        this.convertTextAnswers(textQuestion.answers);
        this.convertedTest.textQuestions.push(new TextQuestionEntity(null,textQuestion.content,this.convertedTextAnswers));
    }

    visitNewTextAnswer(textAnswer:NewTextAnswer):void{
        this.convertedTextAnswers.push(new TextAnswerEntity(null,textAnswer.correct))
    }
}