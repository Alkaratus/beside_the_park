import { DatabaseTest as TestEntity } from '../DataBase/Database.Test';
import { Test as TestQL } from '../GraphQLSchemas/Test/Test';
import { DatabaseSingleChoiceQuestion as SingleChoiceQuestionEntity } from '../DataBase/Database.SingleChoiceQuestion';
import { TestSingleChoiceQuestion as SingleChoiceQuestionQL } from '../GraphQLSchemas/Test/Test.SingleChoiceQuestion';
import { DatabaseMultipleChoiceQuestion as MultipleChoiceQuestionEntity } from '../DataBase/Database.MultipleChoiceQuestion';
import { TestMultipleChoiceQuestion as MultipleChoiceQuestionQL } from '../GraphQLSchemas/Test/Test.MultipleChoiceQuestion';
import { DatabaseChoiceAnswer as ChoiceAnswerEntity } from '../DataBase/Database.ChoiceAnswer';
import { TestChoiceAnswer as ChoiceAnswerQL } from '../GraphQLSchemas/Test/Test.ChoiceAnswer';
import { DatabaseOrderQuestion as OrderQuestionEntity } from '../DataBase/Database.OrderQuestion';
import { TestOrderQuestion as OrderQuestionQL } from '../GraphQLSchemas/Test/Test.OrderQuestion';
import { DatabaseOrderAnswer as OrderAnswerEntity } from '../DataBase/Database.OrderAnswer';
import { TestOrderAnswer as OrderAnswerQL } from '../GraphQLSchemas/Test/Test.OrderAnswer';
import { DatabaseTextQuestion as TextQuestionEntity } from '../DataBase/Database.TextQuestion';
import { TextQuestion as TextQuestionQL } from '../GraphQLSchemas/Test/TextQuestion';
import { DatabaseTextAnswer as TextAnswerEntity } from '../DataBase/Database.TextAnswer';
import { TextAnswer as TextAnswerQL } from '../GraphQLSchemas/Test/TextAnswer';

export abstract class AbstractVisitor {
  abstract visitTestEntity(test: TestEntity): void;
  abstract visitSingleChoiceQuestionEntity(
    singleChoiceQuestion: SingleChoiceQuestionEntity,
  ): void;
  abstract visitMultipleChoiceQuestionEntity(
    multipleChoiceQuestion: MultipleChoiceQuestionEntity,
  ): void;
  abstract visitChoiceAnswerEntity(choiceAnswer: ChoiceAnswerEntity): void;
  abstract visitOrderQuestionEntity(orderQuestion: OrderQuestionEntity): void;
  abstract visitOrderAnswerEntity(orderAnswer: OrderAnswerEntity): void;
  abstract visitTextQuestionEntity(textQuestion: TextQuestionEntity): void;
  abstract visitTextAnswerEntity(textAnswer: TextAnswerEntity): void;

  abstract visitTestQL(test: TestQL): void;
  abstract visitSingleChoiceQuestionQL(
    singleChoiceQuestion: SingleChoiceQuestionQL,
  ): void;
  abstract visitMultipleChoiceQuestionQL(
    multipleChoiceQuestion: MultipleChoiceQuestionQL,
  ): void;
  abstract visitChoiceAnswerQL(choiceAnswer: ChoiceAnswerQL): void;
  abstract visitOrderQuestionQL(orderQuestion: OrderQuestionQL): void;
  abstract visitOrderAnswerQL(orderAnswer: OrderAnswerQL): void;
  abstract visitTextQuestionQL(textQuestion: TextQuestionQL): void;
  abstract visitTextAnswerQL(textAnswer: TextAnswerQL): void;
}
