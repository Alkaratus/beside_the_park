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
    NO_QUESTIONS_ERROR,
    NOT_APPLICABLE_ERROR,
    NOT_ENOUGH_ANSWERS_ERROR,
    NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR
} from "../Errors/ErrorCodes";



export class GraphQLInputToEntityConverter implements Visitor{
    numberOfQuestions: number;
    convertedTest: TestEntity
    convertedChoiceAnswers: ChoiceAnswerEntity[];
    convertedOrderAnswers: OrderAnswerEntity[];
    convertedTextAnswers: TextAnswerEntity[];

    convertTest(test:NewTest):TestEntity{
        this.convertedTest= new TestEntity();
        this.convertedTest.choiceQuestions=[]
        this.convertedTest.orderQuestions=[]
        this.convertedTest.textQuestions=[]
        test.accept(this)
        return this.convertedTest;
    }

    convertSingleChoiceQuestions(questions: NewSingleChoiceQuestion[]){
        questions.forEach((question)=>{
            question.accept(this);
        });

    }

    convertMultipleChoiceQuestions(questions: NewMultipleChoiceQuestion[]){
        questions.forEach((question)=>{
            question.accept(this);
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
            answer.accept(this);
        });
        if(!multiple && correctCounter!=1){
            throw NUMBER_OF_CORRECT_ANSWERS_OTHER_THAN_ONE_ERROR;
        }
    }

    convertOrderQuestions(orderQuestions:NewOrderQuestion[]){
        orderQuestions.forEach((question)=>{
            question.accept(this);
        });
    }

    convertOrderAnswers(orderAnswers:NewOrderAnswer[]){
        this.convertedOrderAnswers=[]
        if(orderAnswers.length<2){
            throw NOT_ENOUGH_ANSWERS_ERROR;
        }
        orderAnswers.forEach((answer)=>{
            answer.accept(this);
        })
        // TODO: Trzeba dodać sprawdzenie czy pozycja odpowiedzi w porządu się nie powtarza
        // TODO: Trzeba dodać sprawdzenie czy pozycje odpowiedzi są spójne
    }

    convertTextQuestions(textQuestions:NewTextQuestion[]){
        textQuestions.forEach((question)=>{
            question.accept(this);
        });
    }

    convertTextAnswers(textAnswers:NewTextAnswer[]){
        this.convertedTextAnswers=[]
        if(textAnswers.length==0){
            throw NOT_ENOUGH_ANSWERS_ERROR;
        }
        textAnswers.forEach((answer)=>{
            answer.accept(this);
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
        this.numberOfQuestions=0;
        this.convertSingleChoiceQuestions(test.singleChoiceQuestions)
        this.convertMultipleChoiceQuestions(test.multipleChoiceQuestions)
        this.convertOrderQuestions(test.orderQuestions)
        this.convertTextQuestions(test.textQuestions)
        this.numberOfQuestions+=this.convertedTest.choiceQuestions.length;
        this.numberOfQuestions+=this.convertedTest.orderQuestions.length;
        this.numberOfQuestions+=this.convertedTest.textQuestions.length;
        if (this.numberOfQuestions==0){
            throw NO_QUESTIONS_ERROR;
        }
    }

    visitNewSingleChoiceQuestion(singleChoiceQuestion:NewSingleChoiceQuestion):void{
        let convertedQuestion= new SingleChoiceQuestionEntity();
        convertedQuestion.content = singleChoiceQuestion.content;
        this.convertChoiceAnswers(singleChoiceQuestion.answers);
        convertedQuestion.answers=this.convertedChoiceAnswers;
        this.convertedTest.choiceQuestions.push(convertedQuestion);
    }

    visitNewMultipleChoiceQuestion(multipleChoiceQuestion:NewMultipleChoiceQuestion):void{
        let convertedQuestion= new MultipleChoiceQuestionEntity();
        convertedQuestion.content = multipleChoiceQuestion.content;
        this.convertChoiceAnswers(multipleChoiceQuestion.answers,true);
        convertedQuestion.answers=this.convertedChoiceAnswers;
        this.convertedTest.choiceQuestions.push(convertedQuestion);
    }

    visitNewChoiceAnswer(choiceAnswer:NewChoiceAnswer):void{
        let convertedAnswer: ChoiceAnswerEntity= new ChoiceAnswerEntity();
        convertedAnswer.content= choiceAnswer.content;
        convertedAnswer.correct= choiceAnswer.correct;
        this.convertedChoiceAnswers.push(convertedAnswer)
    }
    visitNewOrderQuestion(question:NewOrderQuestion):void{
        let convertedQuestion: OrderQuestionEntity= new OrderQuestionEntity();
        convertedQuestion.content = question.content
        this.convertOrderAnswers(question.answers);
        convertedQuestion.answers = this.convertedOrderAnswers;
        this.convertedTest.orderQuestions.push(convertedQuestion);
    }
    visitNewOrderAnswer(orderAnswer:NewOrderAnswer):void{
        let convertedAnswer: OrderAnswerEntity= new OrderAnswerEntity();
        convertedAnswer.content= orderAnswer.content;
        convertedAnswer.order= orderAnswer.order;
        this.convertedOrderAnswers.push(convertedAnswer);
    }
    visitNewTextQuestion(textQuestion:NewTextQuestion):void{
        let convertedQuestion: TextQuestionEntity= new TextQuestionEntity();
        convertedQuestion.content = textQuestion.content
        this.convertTextAnswers(textQuestion.answers);
        convertedQuestion.answers = this.convertedTextAnswers;
        this.convertedTest.textQuestions.push(convertedQuestion);
    }
    visitNewTextAnswer(textAnswer:NewTextAnswer):void{
        let convertedAnswer: TextAnswerEntity= new TextAnswerEntity();
        convertedAnswer.correct=textAnswer.correct;
        this.convertedTextAnswers.push(convertedAnswer)
    }
}