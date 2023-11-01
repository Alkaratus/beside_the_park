import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Test as TestEntity} from "../DataBaseEntities/Test";
import {GraphQLInputToEntityConverter} from "../Converters/GraphQLInputToEntityConverter";
import {NewTest} from "../GraphQLSchemas/NewTest/NewTest";


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

    async addNewTest(newTest: NewTest): Promise<TestEntity> {
        let converter: GraphQLInputToEntityConverter= new GraphQLInputToEntityConverter();
        let createdTest: TestEntity = this.testsRepository.create(converter.convertTest(newTest));
        await this.testsRepository.save(createdTest);
        return createdTest;
    }



}