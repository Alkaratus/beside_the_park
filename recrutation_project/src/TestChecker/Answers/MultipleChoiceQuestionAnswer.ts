

export class MultipleChoiceQuestionAnswer{
    questionID: number;
    answersIDs: number[];
    constructor(questionID: number, answersIDs: number[]) {
        this.questionID= questionID;
        this.answersIDs= answersIDs;
    }
}