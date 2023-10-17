import {Injectable} from "@nestjs/common"
import {
    NewTest,
    Test,
    TestResults,
} from "src/graphql"
import {DataBaseServiceService} from "../DataBaseService/DataBaseService.service";

@Injectable()
export class IndexService{
    tests: Test[]=[];
    databaseService: DataBaseServiceService;
    constructor(databaseService: DataBaseServiceService){
        this.databaseService=databaseService;
    }

    async importDataFromDB(){
        await this.databaseService.getAllTests();
    }

    getTests(){
        return this.tests;
    }

    createNewTest(newTest: NewTest){

    }

    checkAnswers():TestResults{
        return null;
    }
}