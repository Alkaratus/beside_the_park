

export class SingleChoiceQuestionAnswer{
    questionID: number;
    answerID: number;
    constructor(questionID: number, answerID: number) {
        this.questionID= questionID;
        this.answerID= answerID;
    }
}