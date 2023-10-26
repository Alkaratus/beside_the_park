import {SingleChoiceQuestionAnswer} from "./SingleChoiceQuestionAnswer";
import {MultipleChoiceQuestionAnswer} from "./MultipleChoiceQuestionAnswer";
import {OrderQuestionAnswer} from "./OrderQuestionAnswer";
import {TextQuestionAnswer} from "./TextQuestionAnswer";


export class TestAnswers{
    testID: number
    singleChoiceQuestionsAnswers: SingleChoiceQuestionAnswer[]
    multipleChoiceQuestionsAnswers: MultipleChoiceQuestionAnswer[]
    orderQuestionsAnswers: OrderQuestionAnswer[]
    textQuestionsAnswers: TextQuestionAnswer[]
}