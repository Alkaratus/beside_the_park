import {Injectable} from "@nestjs/common"
import { Test as TestQL} from "src/graphql"
import {DataBaseServiceService} from "../DataBaseService/DataBaseService.service";
import {EntityToGraphQLConverter} from "../Converters/EntityToGraphQLConverter";
import {Test as TestDTO} from "../Abstracts/Test";
import {TestAnswers as TestAnswersDTO} from "../TestChecker/Answers/TestAnswers";
import {TestChecker} from "../TestChecker/TestChecker";

@Injectable()
export class IndexService{
    tests: TestQL[]=[];
    databaseService: DataBaseServiceService;
    constructor(databaseService: DataBaseServiceService) {
        this.databaseService = databaseService;
    }

    private async importDataFromDB(){
        let testsFromDb=await this.databaseService.getAllTests();
        let converter: EntityToGraphQLConverter= new EntityToGraphQLConverter();
        this.tests=[];
        testsFromDb.forEach((test)=>{
            this.tests.push(converter.convertTest(test));
        })
    }

    async getTests(){
        await this.importDataFromDB();
        return this.tests;
    }

    async createNewTest(newTest: TestDTO){
        let newTestDB=await this.databaseService.addNewTest(newTest)
        let converter: EntityToGraphQLConverter= new EntityToGraphQLConverter();
        let convertedTest= converter.convertTest(newTestDB);
        this.tests.push(convertedTest);
        return convertedTest;
    }

    async checkAnswers(testAnswers:TestAnswersDTO){
        await this.importDataFromDB();
        let checkedTest=this.tests.find((test)=>test.id==testAnswers.testID);
        let testChecker= new TestChecker();
        return testChecker.checkTestAnswers(checkedTest,testAnswers);
    }
}