import {Test as TestEntity} from "../DataBaseEntities/Test";
import {Test as TestQL} from "../GraphQLSchemas/Test/Test";
import {ChoiceQuestion as ChoiceQuestionEntity} from "../DataBaseEntities/ChoiceQuestion";
import {SingleChoiceQuestion as SingleChoiceQuestionQL} from "../GraphQLSchemas/Test/SingleChoiceQuestion";
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


export class EntityToGraphQLConverter{
    singleChoiceQuestions: SingleChoiceQuestionQL[]
    multipleChoiceQuestions: MultipleChoiceQuestionQL[]

    convertTest(test:TestEntity):TestQL{
        this.singleChoiceQuestions=[]
        this.multipleChoiceQuestions=[]
        let convertedTest:TestQL= new TestQL();
        convertedTest.id=test.id;
        convertedTest.name=test.name;
        this.convertChoiceQuestions(test.choiceQuestions)
        convertedTest.singleChoiceQuestions=this.singleChoiceQuestions
        convertedTest.multipleChoiceQuestions=this.multipleChoiceQuestions
        convertedTest.orderQuestions=this.convertOrderQuestions(test.orderQuestions);
        convertedTest.textQuestions=this.convertTextQuestions(test.textQuestions);
        return convertedTest;
    }

    convertChoiceQuestions(choiceQuestions: ChoiceQuestionEntity[]):void{
        choiceQuestions.forEach((choiceQuestion)=>{
            if(choiceQuestion.multiple){
                this.multipleChoiceQuestions.push(this.convertMultipleChoiceQuestion(choiceQuestion));
            }
            else{
                this.singleChoiceQuestions.push(this.convertSingleChoiceQuestion(choiceQuestion))
            }
        });
    }

    convertSingleChoiceQuestion(choiceQuestion: ChoiceQuestionEntity){
        let convertedQuestion= new SingleChoiceQuestionQL();
        convertedQuestion.id= choiceQuestion.id;
        convertedQuestion.content = choiceQuestion.content;
        convertedQuestion.choiceAnswers = this.convertChoiceAnswers(choiceQuestion.answers);
        return convertedQuestion;
    }

    convertMultipleChoiceQuestion(choiceQuestion: ChoiceQuestionEntity){
        let convertedQuestion= new MultipleChoiceQuestionQL();
        convertedQuestion.id= choiceQuestion.id;
        convertedQuestion.content = choiceQuestion.content;
        convertedQuestion.choiceAnswers = this.convertChoiceAnswers(choiceQuestion.answers);
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
        convertedQuestion.orderAnswers = this.convertOrderAnswers(orderQuestion.answers);
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
        convertedAnswer.order= orderAnswer.order;
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
        convertedQuestion.textAnswers = this.convertTextAnswers(textQuestion.answers);
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