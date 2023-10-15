import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Test} from "../DataBaseEntities/Test";
import {Repository} from "typeorm";
import {TestDTO} from "../DTOs/TestDTO";


@Injectable()
export class DataBaseServiceService{
    constructor( @InjectRepository(Test)private readonly testsRepository: Repository<Test>){}

    getAllTests():Promise<Test[]>{
        return this.testsRepository.find();
    }

    addNewTest(newTest: TestDTO):Test{
        return this.testsRepository.create({
            name: newTest.name,
            choiceQuestions:[],
            orderQuestions:[],
            textQuestions:[],
        });
    }



}