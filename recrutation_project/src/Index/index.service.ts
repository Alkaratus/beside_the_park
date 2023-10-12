import {Injectable} from "@nestjs/common"
import {NewTest, Test} from "src/graphql"
@Injectable()
export class IndexService{
    tests: Test[]=[];
    constructor(){

    }

    importDataToGraphQL(){

    }

    getTests(){
        return this.tests;
    }

    createNewTest(newTest: NewTest){

    }

    checkAnswers(){

    }

}