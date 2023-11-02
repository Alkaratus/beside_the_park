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
    abstract visit(test: TestEntity):void;
    abstract visit(singleChoiceQuestion:SingleChoiceQuestionEntity):void
    abstract visit(multipleChoiceQuestion:MultipleChoiceQuestionEntity):void
    abstract visit(choiceAnswer:ChoiceAnswerEntity):void
    abstract visit(orderQuestion:OrderQuestionEntity):void
    abstract visit(orderAnswer:OrderAnswerEntity):void
    abstract visit(textQuestion:TextQuestionEntity):void
    abstract visit(textAnswer:TextAnswerEntity):void

    abstract visit(test: TestQL):void;
    abstract visit(singleChoiceQuestion:SingleChoiceQuestionQL):void
    abstract visit(multipleChoiceQuestion:MultipleChoiceQuestionQL):void
    abstract visit(choiceAnswer:ChoiceAnswerQL):void
    abstract visit(orderQuestion:OrderQuestionQL):void
    abstract visit(orderAnswer:OrderAnswerQL):void
    abstract visit(textQuestion:TextQuestionQL):void
    abstract visit(textAnswer:TextAnswerQL):void

    abstract visit(test: NewTest):void;
    abstract visit(singleChoiceQuestion:NewSingleChoiceQuestion):void;
    abstract visit(multipleChoiceQuestion:NewMultipleChoiceQuestion):void;
    abstract visit(choiceAnswer:NewChoiceAnswer):void;
    abstract visit(orderChoiceQuestion:NewOrderQuestion):void;
    abstract visit(orderAnswer:NewOrderAnswer):void;
    abstract visit(textQuestion:NewTextQuestion):void;
    abstract visit(textAnswer:NewTextAnswer):void;
}