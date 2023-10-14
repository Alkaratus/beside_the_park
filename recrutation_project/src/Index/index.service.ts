import {Injectable} from "@nestjs/common"
import {
    ChoiceAnswer,
    NewChoiceAnswer,
    NewOrderAnswer,
    NewSingleChoiceQuestion,
    NewTest,
    OrderAnswer,
    SingleChoiceQuestion,
    Test,
    TestResults,
} from "src/graphql"
@Injectable()
export class IndexService{
    static idOfLastTest=0;
    static idOfLastQuestion=0;
    static idOfLastChoiceAnswer=0;
    static idOfLastOrderAnswer=0;
    static idOfLastTextAnswer: number=0;
    tests: Test[]=[];
    constructor(){

    }

    importDataFromDB(){

    }

    getTests(){
        return this.tests;
    }

    createNewTest(newTest: NewTest){
        let created= new Test();
        created.id=IndexService.idOfLastTest;
        this.tests.push(created);
    }

    checkAnswers():TestResults{

        return null;
    }

    convertSingleChoiceQuestion(newSingleChoiceQuestion: NewSingleChoiceQuestion):SingleChoiceQuestion{
        let singleChoiceQuestion= new SingleChoiceQuestion();
        singleChoiceQuestion.id=(++IndexService.idOfLastQuestion);
        singleChoiceQuestion.content=newSingleChoiceQuestion.content;
        for (let answer in newSingleChoiceQuestion.answers){

        }
        return singleChoiceQuestion;
    }

    convertChoiceAnswer(newChoiceAnswer: NewChoiceAnswer):ChoiceAnswer{
        let choiceAnswer= new ChoiceAnswer();
        choiceAnswer.id=(++IndexService.idOfLastChoiceAnswer);
        choiceAnswer.content= newChoiceAnswer.content;
        choiceAnswer.correct=newChoiceAnswer.correct;
        return choiceAnswer
    }

    convertOrderAnswer(newOrderAnswer: NewOrderAnswer): OrderAnswer{
        let orderAnswer= new OrderAnswer();
        orderAnswer.id=(++IndexService.idOfLastOrderAnswer);
        orderAnswer.content= newOrderAnswer.content;
        orderAnswer.position= newOrderAnswer.position;
        return orderAnswer;
    }
}