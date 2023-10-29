import {NewTest} from "../graphql";
import {Test as TestEntity} from "../DataBaseEntities/Test";
import {NewSingleChoiceQuestion, NewMultipleChoiceQuestion} from "../graphql";
import {NewChoiceAnswer} from "../graphql";
import {ChoiceAnswer as ChoiceAnswerEntity} from "../DataBaseEntities/ChoiceAnswer";
import {NewOrderQuestion} from "../graphql";
import {OrderQuestion as OrderQuestionEntity} from "../DataBaseEntities/OrderQuestion";
import {NewOrderAnswer} from "../graphql";
import {OrderAnswer as OrderAnswerEntity} from "../DataBaseEntities/OrderAnswer";
import {NewTextQuestion} from "../graphql"
import {TextQuestion as TextQuestionEntity} from "../DataBaseEntities/TextQuestion";
import {NewTextAnswer} from "../graphql";
import {TextAnswer as TextAnswerEntity} from "../DataBaseEntities/TextAnswer";
import {SingleChoiceQuestion as SingleChoiceQuestionEntity} from "../DataBaseEntities/SingleChoiceQuestion";
import {MultipleChoiceQuestion as MultipleChoiceQuestionEntity} from "../DataBaseEntities/MultipleChoiceQuestion";


export class GraphQLInputToEntityConverter {
    numberOfQuestions: number;

    convertTest(test:NewTest):TestEntity{
        let convertedTest= new TestEntity();
        convertedTest.name=test.name;
        this.numberOfQuestions=0;
        convertedTest.choiceQuestions=this.convertSingleChoiceQuestions(test.singleChoiceQuestions)
        convertedTest.choiceQuestions.concat(this.convertMultipleChoiceQuestions(test.multipleChoiceQuestions));
        convertedTest.orderQuestions=this.convertOrderQuestions(test.orderQuestions)
        convertedTest.textQuestions=this.convertTextQuestions(test.textQuestions)
        if (this.numberOfQuestions==0){
            throw "Test have no questions";
        }
        return convertedTest;
    }

    convertSingleChoiceQuestions(choiceQuestions: NewSingleChoiceQuestion[]):SingleChoiceQuestionEntity[]{
        let convertedChoiceQuestions: SingleChoiceQuestionEntity[]=[];
        choiceQuestions.forEach((choiceQuestion)=>{
            convertedChoiceQuestions.push(this.convertSingleChoiceQuestion(choiceQuestion))
        });
        this.numberOfQuestions+=convertedChoiceQuestions.length;
        return convertedChoiceQuestions;
    }

    convertMultipleChoiceQuestions(choiceQuestions: NewMultipleChoiceQuestion[]):MultipleChoiceQuestionEntity[]{
        let convertedChoiceQuestions: MultipleChoiceQuestionEntity[]=[];
        choiceQuestions.forEach((choiceQuestion)=>{
            convertedChoiceQuestions.push(this.convertMultipleChoiceQuestion(choiceQuestion))
        });
        this.numberOfQuestions+=convertedChoiceQuestions.length;
        return convertedChoiceQuestions;
    }

    convertSingleChoiceQuestion(choiceQuestion: NewMultipleChoiceQuestion):SingleChoiceQuestionEntity{
        let convertedQuestion= new SingleChoiceQuestionEntity();
        convertedQuestion.content = choiceQuestion.content;
        convertedQuestion.answers = this.convertChoiceAnswers(choiceQuestion.answers);
        return convertedQuestion;
    }

    convertMultipleChoiceQuestion(choiceQuestion: NewMultipleChoiceQuestion):MultipleChoiceQuestionEntity{
        let convertedQuestion= new MultipleChoiceQuestionEntity();
        convertedQuestion.content = choiceQuestion.content;
        convertedQuestion.answers = this.convertChoiceAnswers(choiceQuestion.answers,true);
        return convertedQuestion;
    }

    convertChoiceAnswers(choiceAnswers:NewChoiceAnswer[], multiple:boolean=false):ChoiceAnswerEntity[]{
        let convertedChoiceAnswers: ChoiceAnswerEntity[]=[];
        let correctCounter=0;
        if(choiceAnswers.length<2){
            throw "Question have not enough answers";
        }
        choiceAnswers.forEach((choiceAnswer)=>{
            if (choiceAnswer.correct){
                correctCounter++;
            }
            convertedChoiceAnswers.push(this.convertChoiceAnswer(choiceAnswer));
        });
        if(!multiple && correctCounter!=1){
            throw "Single choice question didn't have exactly one correct answer";
        }
        return convertedChoiceAnswers;
    }

    convertChoiceAnswer(choiceAnswer:NewChoiceAnswer):ChoiceAnswerEntity{
        let convertedAnswer: ChoiceAnswerEntity= new ChoiceAnswerEntity();
        convertedAnswer.content= choiceAnswer.content;
        convertedAnswer.correct= choiceAnswer.correct;
        return convertedAnswer;
    }

    convertOrderQuestions(orderQuestions:NewOrderQuestion[]){
        let convertedOrderQuestions: OrderQuestionEntity[]=[];
        orderQuestions.forEach((orderQuestion)=>{
            convertedOrderQuestions.push(this.convertOrderQuestion(orderQuestion))
        });
        this.numberOfQuestions+=convertedOrderQuestions.length;
        return convertedOrderQuestions;
    }

    convertOrderQuestion(orderQuestion: NewOrderQuestion):OrderQuestionEntity{
        let convertedQuestion: OrderQuestionEntity= new OrderQuestionEntity();
        convertedQuestion.content = orderQuestion.content
        convertedQuestion.answers = this.convertOrderAnswers(orderQuestion.answers);
        return convertedQuestion;
    }

    convertOrderAnswers(orderAnswers:NewOrderAnswer[]):OrderAnswerEntity[]{
        let convertedOrderAnswers: OrderAnswerEntity[]=[];
        if(orderAnswers.length<2){
            throw "Question have not enough answers";
        }
        orderAnswers.forEach((orderAnswer)=>{
            convertedOrderAnswers.push(this.convertOrderAnswer(orderAnswer))
        })
        return convertedOrderAnswers;
    }

    convertOrderAnswer(orderAnswer:NewOrderAnswer):OrderAnswerEntity{
        let convertedAnswer: OrderAnswerEntity= new OrderAnswerEntity();
        convertedAnswer.content= orderAnswer.content;
        convertedAnswer.order= orderAnswer.order;
        return convertedAnswer;
    }

    convertTextQuestions(textQuestions:NewTextQuestion[]){
        let convertedTextQuestions: TextQuestionEntity[]=[];
        textQuestions.forEach((textQuestion)=>{
            convertedTextQuestions.push(this.convertTextQuestion(textQuestion))
        });
        this.numberOfQuestions+=convertedTextQuestions.length;
        return convertedTextQuestions;
    }

    convertTextQuestion(textQuestion: NewTextQuestion):TextQuestionEntity{
        let convertedQuestion: TextQuestionEntity= new TextQuestionEntity();
        convertedQuestion.content = textQuestion.content
        convertedQuestion.answers = this.convertTextAnswers(textQuestion.answers);
        return convertedQuestion;
    }

    convertTextAnswers(textAnswers:NewTextAnswer[]):TextAnswerEntity[]{
        let convertedTextAnswers: TextAnswerEntity[]=[];
        if(textAnswers.length==0){
            throw "Question have not enough answers";
        }
        textAnswers.forEach((textAnswer)=>{
            convertedTextAnswers.push(this.convertTextAnswer(textAnswer))
        })
        return convertedTextAnswers;
    }

    convertTextAnswer(textAnswer:NewTextAnswer):TextAnswerEntity{
        let convertedAnswer: TextAnswerEntity= new TextAnswerEntity();
        convertedAnswer.correct=textAnswer.correct;
        return convertedAnswer;
    }
}