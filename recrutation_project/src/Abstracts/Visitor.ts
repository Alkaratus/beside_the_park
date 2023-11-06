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

export abstract class Visitor{
    abstract visitTestEntity(test: TestEntity):void;
    abstract visitSingleChoiceQuestionEntity(singleChoiceQuestion:SingleChoiceQuestionEntity):void
    abstract visitMultipleChoiceQuestionEntity(multipleChoiceQuestion:MultipleChoiceQuestionEntity):void
    abstract visitChoiceAnswerEntity(choiceAnswer:ChoiceAnswerEntity):void
    abstract visitOrderQuestionEntity(orderQuestion:OrderQuestionEntity):void
    abstract visitOrderAnswerEntity(orderAnswer:OrderAnswerEntity):void
    abstract visitTextQuestionEntity(textQuestion:TextQuestionEntity):void
    abstract visitTextAnswerEntity(textAnswer:TextAnswerEntity):void

    abstract visitTestQL(test: TestQL):void;
    abstract visitSingleChoiceQuestionQL(singleChoiceQuestion:SingleChoiceQuestionQL):void
    abstract visitMultipleChoiceQuestionQL(multipleChoiceQuestion:MultipleChoiceQuestionQL):void
    abstract visitChoiceAnswerQL(choiceAnswer:ChoiceAnswerQL):void
    abstract visitOrderQuestionQL(orderQuestion:OrderQuestionQL):void
    abstract visitOrderAnswerQL(orderAnswer:OrderAnswerQL):void
    abstract visitTextQuestionQL(textQuestion:TextQuestionQL):void
    abstract visitTextAnswerQL(textAnswer:TextAnswerQL):void

    abstract visitNewTest(test: NewTest):void;
    abstract visitNewSingleChoiceQuestion(singleChoiceQuestion:NewSingleChoiceQuestion):void;
    abstract visitNewMultipleChoiceQuestion(multipleChoiceQuestion:NewMultipleChoiceQuestion):void;
    abstract visitNewChoiceAnswer(choiceAnswer:NewChoiceAnswer):void;
    abstract visitNewOrderQuestion(orderChoiceQuestion:NewOrderQuestion):void;
    abstract visitNewOrderAnswer(orderAnswer:NewOrderAnswer):void;
    abstract visitNewTextQuestion(textQuestion:NewTextQuestion):void;
    abstract visitNewTextAnswer(textAnswer:NewTextAnswer):void;
}