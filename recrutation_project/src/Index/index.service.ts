import {Injectable} from "@nestjs/common"
import { NewTest, Test, TestResults,
} from "src/graphql"
import {DataBaseServiceService} from "../DataBaseService/DataBaseService.service";
import {EntityToGraphQLConverter} from "../Converters/EntityToGraphQLConverter";

@Injectable()
export class IndexService{
    tests: Test[]=[];
    databaseService: DataBaseServiceService;
    constructor(databaseService: DataBaseServiceService) {
        this.databaseService = databaseService;
    }

    private async importDataFromDB(){
        let testsFromDb=await this.databaseService.getAllTests();
        let converter: EntityToGraphQLConverter= new EntityToGraphQLConverter();
        testsFromDb.forEach((test)=>{
            this.tests.push(converter.convertTest(test));
        })
    }

    async getTests(){
        await this.importDataFromDB();
        return this.tests;
    }

    createNewTest(newTest: NewTest){

    }

    checkAnswers():TestResults{
        return null;
    }
}