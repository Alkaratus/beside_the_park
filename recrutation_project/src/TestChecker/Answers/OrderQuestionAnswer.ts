

export class OrderQuestionAnswer{
    questionID: number;
    answersIDs: number[];
    constructor(questionID: number, answerID: number[]) {
        this.questionID= questionID;
        this.answersIDs= answerID;
    }
}