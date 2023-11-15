import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Test as TestEntity} from "../DataBaseEntities/Test";
import {GraphQLInputToEntityConverter} from "../Converters/GraphQLInputToEntityConverter";
import {NewTest} from "../GraphQLSchemas/NewTest/NewTest";
import {ChoiceQuestion as ChoiceQuestionEntity} from "../DataBaseEntities/ChoiceQuestion";
import {MultipleChoiceQuestion as MultipleChoiceQuestionEntity} from "../DataBaseEntities/MultipleChoiceQuestion";
import {SingleChoiceQuestion as SingleChoiceQuestionEntity} from "../DataBaseEntities/SingleChoiceQuestion";


@Injectable()
export class DataBaseServiceService{
    constructor( @InjectRepository(TestEntity)private readonly testsRepository: Repository<TestEntity>){}

    async getAllTests():Promise<TestEntity[]>{
        let tests=await this.testsRepository.find({
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
        tests.forEach((test)=>{
            this.resolveQuestions(test.choiceQuestions);
        })
        return tests;
    }

    async getTestById(id:number){
        let test=await this.testsRepository.findOne({
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
            where:{
                id:id
            }
        });
        if(test!=null){
            this.resolveQuestions(test.choiceQuestions);
        }
        return test;
    }

    async addNewTest(newTest: NewTest): Promise<TestEntity> {
        let converter: GraphQLInputToEntityConverter= new GraphQLInputToEntityConverter();
        let createdTest: TestEntity = this.testsRepository.create(converter.convertTest(newTest));
        await this.testsRepository.save(createdTest);
        return createdTest;
    }

    resolveQuestions(choiceQuestions: ChoiceQuestionEntity[]):void{
        choiceQuestions.forEach((question,index,questions)=>{
            if(question.multiple){
                questions[index]=new MultipleChoiceQuestionEntity(question.id,question.content,question.answers)
            }
            else{
                questions[index]=new SingleChoiceQuestionEntity(question.id,question.content,question.answers)
            }
        })
    }

}