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

export class AbstractResolver implements Visitor{
    testEntity: TestEntity
    singleChoiceQuestionEntity:SingleChoiceQuestionEntity
    multipleChoiceQuestionEntity:MultipleChoiceQuestionEntity
    choiceAnswerEntity:ChoiceAnswerEntity
    orderQuestionEntity:OrderQuestionEntity
    orderAnswerEntity:OrderAnswerEntity
    textQuestionEntity:TextQuestionEntity
    textAnswerEntity:TextAnswerEntity

    testQL:TestQL
    singleChoiceQuestionQL:SingleChoiceQuestionQL
    multipleChoiceQuestionQL:MultipleChoiceQuestionQL
    choiceAnswerQL:ChoiceAnswerQL
    orderQuestionQL:OrderQuestionQL
    orderAnswerQL:OrderAnswerQL
    textQuestionQL:TextQuestionQL
    textAnswerQL:TextAnswerQL

    newTest: NewTest
    newSingleChoiceQuestion:NewSingleChoiceQuestion
    newMultipleChoiceQuestion:NewMultipleChoiceQuestion
    newChoiceAnswer:NewChoiceAnswer
    newOrderQuestion:NewOrderQuestion
    newOrderAnswer:NewOrderAnswer
    newTextQuestion:NewTextQuestion
    newTextAnswer:NewTextAnswer

    visitTestEntity(test: TestEntity):void{
        this.testEntity=test;
    }

    visitSingleChoiceQuestionEntity(singleChoiceQuestion:SingleChoiceQuestionEntity):void{
        this.singleChoiceQuestionEntity=singleChoiceQuestion;
    }

    visitMultipleChoiceQuestionEntity(multipleChoiceQuestion:MultipleChoiceQuestionEntity):void{
        this.multipleChoiceQuestionEntity=multipleChoiceQuestion
    }

    visitChoiceAnswerEntity(choiceAnswer:ChoiceAnswerEntity):void{
        this.choiceAnswerEntity=choiceAnswer;
    }

    visitOrderQuestionEntity(orderQuestion:OrderQuestionEntity):void{
        this.orderQuestionEntity=orderQuestion
    }

    visitOrderAnswerEntity(orderAnswer:OrderAnswerEntity):void{
        this.orderAnswerEntity=orderAnswer
    }

    visitTextQuestionEntity(textQuestion:TextQuestionEntity):void{
        this.textQuestionEntity=textQuestion
    }

    visitTextAnswerEntity(textAnswer:TextAnswerEntity):void{
        this.textAnswerEntity=textAnswer
    }


    visitTestQL(test: TestQL):void{
        this.testQL=test;
    }

    visitSingleChoiceQuestionQL(singleChoiceQuestion:SingleChoiceQuestionQL):void{
        this.singleChoiceQuestionQL=singleChoiceQuestion
    }

    visitMultipleChoiceQuestionQL(multipleChoiceQuestion:MultipleChoiceQuestionQL):void{
        this.multipleChoiceQuestionQL=multipleChoiceQuestion
    }

    visitChoiceAnswerQL(choiceAnswer:ChoiceAnswerQL):void{
        this.choiceAnswerQL=choiceAnswer
    }

    visitOrderQuestionQL(orderQuestion:OrderQuestionQL):void{
        this.orderQuestionQL=orderQuestion
    }

    visitOrderAnswerQL(orderAnswer:OrderAnswerQL):void{
        this.orderAnswerQL=orderAnswer
    }

    visitTextQuestionQL(textQuestion:TextQuestionQL):void{
        this.textQuestionQL=textQuestion
    }

    visitTextAnswerQL(textAnswer:TextAnswerQL):void{
        this.textAnswerQL=textAnswer;
    }


    visitNewTest(test: NewTest):void{
        this.newTest=test;
    }

    visitNewSingleChoiceQuestion(singleChoiceQuestion:NewSingleChoiceQuestion):void{
        this.newSingleChoiceQuestion=singleChoiceQuestion;
    }

    visitNewMultipleChoiceQuestion(multipleChoiceQuestion:NewMultipleChoiceQuestion):void{
        this.newMultipleChoiceQuestion=multipleChoiceQuestion
    }

    visitNewChoiceAnswer(choiceAnswer:NewChoiceAnswer):void{
        this.newChoiceAnswer=choiceAnswer
    }

    visitNewOrderQuestion(orderChoiceQuestion:NewOrderQuestion):void{
        this.newOrderQuestion=orderChoiceQuestion;
    }

    visitNewOrderAnswer(orderAnswer:NewOrderAnswer):void{
        this.newOrderAnswer=orderAnswer;
    }

    visitNewTextQuestion(textQuestion:NewTextQuestion):void{
        this.newTextQuestion=textQuestion;
    }

    visitNewTextAnswer(textAnswer:NewTextAnswer):void{
        this.newTextAnswer=textAnswer;
    }

}