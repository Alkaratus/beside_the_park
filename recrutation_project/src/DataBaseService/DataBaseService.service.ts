import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Test as TestEntity} from "../DataBaseEntities/Test";
import {Test as TestDTO} from "../DTOs/Test";
import {DTOToEntityConverter} from "../Converters/DTOToEntityConverter";

@Injectable()
export class DataBaseServiceService{
    constructor( @InjectRepository(TestEntity)private readonly testsRepository: Repository<TestEntity>){}

    getAllTests():Promise<TestEntity[]>{
        return this.testsRepository.find({
            relations: {
                choiceQuestions:{
                    answers:true
                },
                orderQuestions:{
                    answers:true
                },
                textQuestions:{
                    answers:true
                }
            },
        });
    }

    async addNewTest(newTest: TestDTO): Promise<TestEntity> {
        let converter: DTOToEntityConverter= new DTOToEntityConverter();
        let createdTest: TestEntity = this.testsRepository.create(converter.convertTest(newTest));
        await this.testsRepository.save(createdTest);
        return createdTest;
    }



}