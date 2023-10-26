import {
    ChoiceQuestion, MultipleChoiceQuestionResult, OrderQuestion, OrderQuestionResult, SingleChoiceQuestionResult,
    Test as TestQL, TestResults, TextQuestion, TextQuestionResult
} from "../graphql"
import {TestAnswers as TestAnswersDTO} from "./Answers/TestAnswers";
import {SingleChoiceQuestionAnswer} from "./Answers/SingleChoiceQuestionAnswer";
import {MultipleChoiceQuestionAnswer} from "./Answers/MultipleChoiceQuestionAnswer";
import {OrderQuestionAnswer} from "./Answers/OrderQuestionAnswer";
import {TextQuestionAnswer} from "./Answers/TextQuestionAnswer";

export class TestChecker{
    correctAnswers: number;
    checkTestAnswers(test:TestQL,answers:TestAnswersDTO):TestResults{
        this.correctAnswers=0;
        let testResults= new TestResults();
        testResults.testID=test.id;
        testResults.singleChoiceQuestionResults=[]
        testResults.multipleChoiceQuestionResults=[]
        testResults.orderQuestionResults=[]
        testResults.textQuestionResults=[]

        test.choiceQuestions.forEach((question)=>{
            let questionAnswer=answers.singleChoiceQuestionsAnswers.find((answer)=>answer.questionID==question.id)
            if(questionAnswer!=undefined){
                this.checkSingleChoiceQuestionAnswer(question,questionAnswer)
            }
            else{
                let questionAnswer=answers.multipleChoiceQuestionsAnswers.find((answer)=> {
                    answer.questionID = question.id;
                })
                if(questionAnswer!=undefined){
                    this.checkMultipleChoiceQuestionAnswer(question,questionAnswer)
                }
            }
        })

        test.orderQuestions.forEach((question)=>{
            let questionAnswer=answers.orderQuestionsAnswers.find((answer)=>{
                answer.questionID=question.id;
            })
            if(questionAnswer!=undefined){
                this.checkOrderQuestionAnswer(question,questionAnswer)
            }
        })

        test.textQuestions.forEach((question)=>{
            let questionAnswer=answers.textQuestionsAnswers.find((answer)=>{
                answer.questionID=question.id;
            })
            if(questionAnswer!=undefined){
                this.checkTextQuestionAnswer(question,questionAnswer)
            }
        })
        testResults.numberOfCorrect=this.correctAnswers;
        return testResults;
    }

    checkSingleChoiceQuestionAnswer(question:ChoiceQuestion,answer:SingleChoiceQuestionAnswer):SingleChoiceQuestionResult{
        let correctAnswer=question.choiceAnswers.find((answer)=>answer.correct)
        let result= new SingleChoiceQuestionResult();
        result.questionID=question.id;
        if(correctAnswer.id==answer.answerID){
            this.correctAnswers++;
            result.correct=true;
            result.correctAnswerID=null;
        }
        else{
            result.correct=false;
            result.correctAnswerID=correctAnswer.id;
        }
        return result;

    }

    checkMultipleChoiceQuestionAnswer(question:ChoiceQuestion,answer:MultipleChoiceQuestionAnswer):MultipleChoiceQuestionResult{
        let correctAnswers= question.choiceAnswers.filter(answer=>answer.correct==true)
        let numberOfCorrectAnswers= correctAnswers.length;
        let result= new MultipleChoiceQuestionResult();
        result.questionID=question.id;
        let correct=answer.answersIDs.length==numberOfCorrectAnswers
        if (correct){
            let i=0;
            while(correct && i<answer.answersIDs.length){
                correct= correctAnswers.find(questionAnswer=>questionAnswer.id==answer.answersIDs[i])!=undefined;
                i++;
            }
        }
        if(correct){
            result.correct=true;
            result.correctAnswerID=null;
        }
        else{
            result.correct=false;
            result.correctAnswerID=[]
            correctAnswers.forEach((answer)=>{
                result.correctAnswerID.push(answer.id);
            })
        }
        return result;
    }

    checkOrderQuestionAnswer(question:OrderQuestion,answer:OrderQuestionAnswer):OrderQuestionResult{
        let result= new OrderQuestionResult();
        result.questionID=question.id;
        let correct=true;
        for (let i=0; i<answer.answersIDs.length;i++){
            if(answer.answersIDs[i]!=question.orderAnswers[i].id){
                correct=false;
            }
        }
        if(correct){
            result.correct=true;
            result.correctAnswersIDOrder=null;
        }
        else{
            result.correct=false
            result.correctAnswersIDOrder=[]
            question.orderAnswers.forEach((answer)=>{
                result.correctAnswersIDOrder.push(answer.id);
            })
        }
        return result;
    }

    checkTextQuestionAnswer(question:TextQuestion,answer:TextQuestionAnswer):TextQuestionResult{
        let result=new TextQuestionResult();
        result.questionID=question.id;
        let correct= question.textAnswers.find((questionAnswer)=>questionAnswer.correct==answer.answer)!=undefined;
        if(correct){
            result.correct=true;
            result.correctAnswersID=null;
        }
        else{
            result.correct=false;
            result.correctAnswersID=[];
            question.textAnswers.forEach((answer)=>{
                result.correctAnswersID.push(answer.id);
            })
        }
        return result;
    }

}