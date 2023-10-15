import {DataBaseServiceService} from "../src/DataBaseService/DataBaseService.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {Test as TestEntity} from "../src/DataBaseEntities/Test"
import {DataSource, Repository} from "typeorm";
import {DATA_BASE_ENTITIES} from "../src/DataBaseEntities/database.entities";
import {exit} from "@nestjs/cli/actions";
import {TestDTO} from "../src/DTOs/TestDTO";

const TypeORMMySqlTestingModule = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'beside_the_park',
    entities: DATA_BASE_ENTITIES,
    synchronize: true,
});


describe("DB tests",()=>{
    let service:DataBaseServiceService;
    let testRepository: Repository<TestEntity>;
    let testingModule: TestingModule;

    const TEST_REPOSITORY_TOKEN= getRepositoryToken(TestEntity);

    beforeAll(async ()=>{

        testingModule= await Test.createTestingModule({
            imports: [
                TypeORMMySqlTestingModule,
                TypeOrmModule.forFeature([TestEntity]),
            ],
            providers:[DataBaseServiceService]
        }).compile();
        service= testingModule.get<DataBaseServiceService>(DataBaseServiceService);
        testRepository= testingModule.get<Repository<TestEntity>>(TEST_REPOSITORY_TOKEN)

    });

    afterAll(async ()=>{
        await testingModule.close();
    })


    it("Service should be defined",()=>{
        expect(service).toBeDefined();
    });

    it("Repository should be defined",()=>{
        expect(testRepository).toBeDefined();
    })

    it("should add new test to database", ()=>{
            let testDTO:TestDTO= new TestDTO();
            testDTO.name="Test test";
            testDTO.choiceQuestions=[];
            testDTO.textQuestions=[];
            testDTO.orderQuestions=[];
            let createdTest=service.addNewTest(testDTO)
            expect(createdTest.name==testDTO.name);
    })


})