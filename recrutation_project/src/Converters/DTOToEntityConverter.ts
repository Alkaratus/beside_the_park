import {Test as TestDTO} from "../DTOs/Test"
import {Test as TestEntity} from "../DataBaseEntities/Test";
import {ChoiceQuestion as ChoiceQuestionDTO} from "../DTOs/ChoiceQuestion";
import {ChoiceQuestion as ChoiceQuestionEntity} from "../DataBaseEntities/ChoiceQuestion";
import {ChoiceAnswer as ChoiceAnswerDTO} from "../DTOs/ChoiceAnswer";
import {ChoiceAnswer as ChoiceAnswerEntity} from "../DataBaseEntities/ChoiceAnswer";
import {OrderQuestion as OrderQuestionDTO} from "../DTOs/OrderQuestion";
import {OrderQuestion as OrderQuestionEntity} from "../DataBaseEntities/OrderQuestion";
import {OrderAnswer as OrderAnswerDTO} from "../DTOs/OrderAnswer";
import {OrderAnswer as OrderAnswerEntity} from "../DataBaseEntities/OrderAnswer";
import {TextQuestion as TextQuestionDTO} from "../DTOs/TextQuestion";
import {TextQuestion as TextQuestionEntity} from "../DataBaseEntities/TextQuestion";
import {TextAnswer as TextAnswerDTO} from "../DTOs/TextAnswer";
import {TextAnswer as TextAnswerEntity} from "../DataBaseEntities/TextAnswer";
import {SingleChoiceQuestion as SingleChoiceQuestionEntity} from "../DataBaseEntities/SingleChoiceQuestion";
import {MultipleChoiceQuestion as MultipleChoiceQuestionEntity} from "../DataBaseEntities/MultipleChoiceQuestion";


export class DTOToEntityConverter{
    numberOfQuestions: number;

    convertTest(test:TestDTO):TestEntity{
        let convertedTest= new TestEntity();
        convertedTest.name=test.name;
        this.numberOfQuestions=0;
        convertedTest.choiceQuestions=this.convertChoiceQuestions(test.choiceQuestions)
        convertedTest.orderQuestions=this.convertOrderQuestions(test.orderQuestions)
        convertedTest.textQuestions=this.convertTextQuestions(test.textQuestions)
        if (this.numberOfQuestions==0){
            throw "Test have no questions";
        }
        return convertedTest;
    }

    convertChoiceQuestions(choiceQuestions: ChoiceQuestionDTO[]):ChoiceQuestionEntity[]{
        let convertedChoiceQuestions: ChoiceQuestionEntity[]=[];
        choiceQuestions.forEach((choiceQuestion)=>{
            convertedChoiceQuestions.push(this.convertChoiceQuestion(choiceQuestion))
        });
        this.numberOfQuestions+=convertedChoiceQuestions.length;
        return convertedChoiceQuestions;
    }

    convertChoiceQuestion(choiceQuestion: ChoiceQuestionDTO):ChoiceQuestionEntity{
        let convertedQuestion: ChoiceQuestionEntity= choiceQuestion.multiple? new SingleChoiceQuestionEntity(): new MultipleChoiceQuestionEntity();
        //let convertedQuestion= new ChoiceQuestionEntity();
        convertedQuestion.content = choiceQuestion.content;
        convertedQuestion.answers = this.convertChoiceAnswers(choiceQuestion.answers,choiceQuestion.multiple);
        convertedQuestion.multiple=choiceQuestion.multiple
        return convertedQuestion;
    }

    convertChoiceAnswers(choiceAnswers:ChoiceAnswerDTO[], multiple:boolean=false):ChoiceAnswerEntity[]{
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

    convertChoiceAnswer(choiceAnswer:ChoiceAnswerDTO):ChoiceAnswerEntity{
        let convertedAnswer: ChoiceAnswerEntity= new ChoiceAnswerEntity();
        convertedAnswer.content= choiceAnswer.content;
        convertedAnswer.correct= choiceAnswer.correct;
        return convertedAnswer;
    }

    convertOrderQuestions(orderQuestions:OrderQuestionDTO[]){
        let convertedOrderQuestions: OrderQuestionEntity[]=[];
        orderQuestions.forEach((orderQuestion)=>{
            convertedOrderQuestions.push(this.convertOrderQuestion(orderQuestion))
        });
        this.numberOfQuestions+=convertedOrderQuestions.length;
        return convertedOrderQuestions;
    }

    convertOrderQuestion(orderQuestion: OrderQuestionDTO):OrderQuestionEntity{
        let convertedQuestion: OrderQuestionEntity= new OrderQuestionEntity();
        convertedQuestion.content = orderQuestion.content
        convertedQuestion.answers = this.convertOrderAnswers(orderQuestion.answers);
        return convertedQuestion;
    }

    convertOrderAnswers(orderAnswers:OrderAnswerDTO[]):OrderAnswerEntity[]{
        let convertedOrderAnswers: OrderAnswerEntity[]=[];
        if(orderAnswers.length<2){
            throw "Question have not enough answers";
        }
        orderAnswers.forEach((orderAnswer)=>{
            convertedOrderAnswers.push(this.convertOrderAnswer(orderAnswer))
        })
        return convertedOrderAnswers;
    }

    convertOrderAnswer(orderAnswer:OrderAnswerDTO):OrderAnswerEntity{
        let convertedAnswer: OrderAnswerEntity= new OrderAnswerEntity();
        convertedAnswer.content= orderAnswer.content;
        convertedAnswer.order= orderAnswer.order;
        return convertedAnswer;
    }

    convertTextQuestions(textQuestions:TextQuestionDTO[]){
        let convertedTextQuestions: TextQuestionEntity[]=[];
        textQuestions.forEach((textQuestion)=>{
            convertedTextQuestions.push(this.convertTextQuestion(textQuestion))
        });
        this.numberOfQuestions+=convertedTextQuestions.length;
        return convertedTextQuestions;
    }

    convertTextQuestion(textQuestion: TextQuestionDTO):TextQuestionEntity{
        let convertedQuestion: TextQuestionEntity= new TextQuestionEntity();
        convertedQuestion.content = textQuestion.content
        convertedQuestion.answers = this.convertTextAnswers(textQuestion.answers);
        return convertedQuestion;
    }

    convertTextAnswers(textAnswers:TextAnswerDTO[]):TextAnswerEntity[]{
        let convertedTextAnswers: TextAnswerEntity[]=[];
        if(textAnswers.length==0){
            throw "Question have not enough answers";
        }
        textAnswers.forEach((textAnswer)=>{
            convertedTextAnswers.push(this.convertTextAnswer(textAnswer))
        })
        return convertedTextAnswers;
    }

    convertTextAnswer(textAnswer:TextAnswerDTO):TextAnswerEntity{
        let convertedAnswer: TextAnswerEntity= new TextAnswerEntity();
        convertedAnswer.correct=textAnswer.correct;
        return convertedAnswer;
    }
}