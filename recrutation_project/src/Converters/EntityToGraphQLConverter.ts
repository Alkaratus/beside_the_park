import {Test as TestEntity} from "../DataBaseEntities/Test"
import {Test as TestQL} from "../graphql"
import {ChoiceQuestion as ChoiceQuestionEntity} from "../DataBaseEntities/ChoiceQuestion";
import {ChoiceQuestion as ChoiceQuestionQL} from "../graphql"
import {ChoiceAnswer as ChoiceAnswerEntity} from "../DataBaseEntities/ChoiceAnswer";
import {ChoiceAnswer as ChoiceAnswerQL} from "../graphql"
import {OrderQuestion as OrderQuestionEntity} from "../DataBaseEntities/OrderQuestion";
import {OrderQuestion as OrderQuestionQL} from "../graphql"
import {OrderAnswer as OrderAnswerEntity} from "../DataBaseEntities/OrderAnswer";
import {OrderAnswer as OrderAnswerQL} from "../graphql"
import {TextQuestion as TextQuestionEntity} from "../DataBaseEntities/TextQuestion";
import {TextQuestion as TextQuestionQL} from "../graphql"
import {TextAnswer as TextAnswerEntity} from "../DataBaseEntities/TextAnswer";
import {TextAnswer as TextAnswerQL} from "../graphql"


export class EntityToGraphQLConverter{
    convertTest(test:TestEntity):TestQL{
        let convertedTest:TestQL= new TestQL();
        convertedTest.id=test.id;
        convertedTest.name=test.name;
        convertedTest.questions=[]
        for(let i=0;i<test.choiceQuestions.length;i++){
            convertedTest.questions.push(this.convertChoiceQuestion(test.choiceQuestions[i]));
        }
        for(let i=0;i<test.orderQuestions.length;i++){
            convertedTest.questions.push(this.convertOrderQuestion(test.orderQuestions[i]));
        }
        for(let i=0;i<test.textQuestions.length;i++){
            convertedTest.questions.push(this.convertTextQuestion(test.textQuestions[i]));
        }
        return convertedTest;
    }

    convertChoiceQuestions(choiceQuestions: ChoiceQuestionEntity[]):ChoiceQuestionQL[]{
        let convertedChoiceQuestions: ChoiceQuestionQL[]=[];
        choiceQuestions.forEach((choiceQuestion)=>{
            convertedChoiceQuestions.push(this.convertChoiceQuestion(choiceQuestion))
        });
        return convertedChoiceQuestions;
    }

    convertChoiceQuestion(choiceQuestion: ChoiceQuestionEntity):ChoiceQuestionQL{
        let convertedQuestion: ChoiceQuestionQL= new ChoiceQuestionQL();
        convertedQuestion.id= choiceQuestion.id;
        convertedQuestion.content = choiceQuestion.content;
        convertedQuestion.multiple = choiceQuestion.multiple;
        convertedQuestion.answers = this.convertChoiceAnswers(choiceQuestion.answers);
        return convertedQuestion;
    }

    convertChoiceAnswers(choiceAnswers:ChoiceAnswerEntity[]):ChoiceAnswerQL[]{
        let convertedChoiceAnswers: ChoiceAnswerQL[]=[];
        choiceAnswers.forEach((choiceAnswer)=>{
            convertedChoiceAnswers.push(this.convertChoiceAnswer(choiceAnswer));
        });
        return convertedChoiceAnswers;
    }

    convertChoiceAnswer(choiceAnswer:ChoiceAnswerEntity):ChoiceAnswerQL{
        let convertedAnswer: ChoiceAnswerQL= new ChoiceAnswerQL();
        convertedAnswer.id= choiceAnswer.id
        convertedAnswer.content= choiceAnswer.content;
        convertedAnswer.correct= choiceAnswer.correct;
        return convertedAnswer;
    }

    convertOrderQuestions(orderQuestions:OrderQuestionEntity[]): OrderQuestionQL[]{
        let convertedOrderQuestions: OrderQuestionQL[]=[];
        orderQuestions.forEach((orderQuestion)=>{
            convertedOrderQuestions.push(this.convertOrderQuestion(orderQuestion))
        });
        return convertedOrderQuestions;
    }

    convertOrderQuestion(orderQuestion: OrderQuestionEntity):OrderQuestionQL{
        let convertedQuestion: OrderQuestionQL= new OrderQuestionQL();
        convertedQuestion.id= orderQuestion.id;
        convertedQuestion.content = orderQuestion.content
        convertedQuestion.answers = this.convertOrderAnswers(orderQuestion.answers);
        return convertedQuestion;
    }

    convertOrderAnswers(orderAnswers:OrderAnswerEntity[]):OrderAnswerQL[]{
        let convertedOrderAnswers: OrderAnswerQL[]=[];
        orderAnswers.forEach((orderAnswer)=>{
            convertedOrderAnswers.push(this.convertOrderAnswer(orderAnswer))
        })
        return convertedOrderAnswers;
    }

    convertOrderAnswer(orderAnswer:OrderAnswerEntity):OrderAnswerQL{
        let convertedAnswer: OrderAnswerQL= new OrderAnswerQL();
        convertedAnswer.id= orderAnswer.id
        convertedAnswer.content= orderAnswer.content;
        convertedAnswer.position= orderAnswer.order;
        return convertedAnswer;
    }

    convertTextQuestions(textQuestions:TextQuestionEntity[]): TextQuestionQL[]{
        let convertedTextQuestions: TextQuestionQL[]=[];
        textQuestions.forEach((textQuestion)=>{
            convertedTextQuestions.push(this.convertTextQuestion(textQuestion))
        });
        return convertedTextQuestions;
    }

    convertTextQuestion(textQuestion: TextQuestionEntity):TextQuestionQL{
        let convertedQuestion: TextQuestionQL= new TextQuestionQL();
        convertedQuestion.id= textQuestion.id;
        convertedQuestion.content = textQuestion.content
        convertedQuestion.answers = this.convertTextAnswers(textQuestion.answers);
        return convertedQuestion;
    }

    convertTextAnswers(textAnswers:TextAnswerEntity[]):TextAnswerQL[]{
        let convertedTextAnswers: TextAnswerQL[]=[];
        textAnswers.forEach((textAnswer)=>{
            convertedTextAnswers.push(this.convertTextAnswer(textAnswer))
        })
        return convertedTextAnswers;
    }

    convertTextAnswer(textAnswer:TextAnswerQL):TextAnswerQL{
        let convertedAnswer: TextAnswerQL= new TextAnswerQL();
        convertedAnswer.id= textAnswer.id
        convertedAnswer.correct=textAnswer.correct;
        return convertedAnswer;
    }
}