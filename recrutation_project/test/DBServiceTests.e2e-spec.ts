import {DataBaseServiceService} from "../src/DataBaseService/DataBaseService.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {Test as TestEntity} from "../src/DataBaseEntities/Test"
import {Repository} from "typeorm";
import {DATA_BASE_ENTITIES} from "../src/DataBaseEntities/database.entities";
import {NewOrderQuestion, NewSingleChoiceQuestion, NewTest, NewTextQuestion} from "../src/graphql";

const TypeORMMySqlTestingModule = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'beside_the_park_test',
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

    it("New test should be add to database",async ()=>{
        let newTest= new NewTest();
        newTest.name="Test test";
        let choiceQuestion= new NewSingleChoiceQuestion();
        choiceQuestion.content="What is the capital of France?";
        choiceQuestion.answers=[
            {content:"London",correct:false},
            {content:"Paris",correct:true},
            {content:"Rome",correct:false},
            {content:"Madrid",correct:false}
        ];
        newTest.singleChoiceQuestions=[choiceQuestion];

        newTest.multipleChoiceQuestions=[];

        let textQuestion= new NewTextQuestion();
        textQuestion.content="What is the famous phrase from Star Wars";
        textQuestion.answers=[
            {correct:"May the force be with you"},
            {correct:"I have bad feelings about this"}
        ]
        newTest.textQuestions=[textQuestion];

        let orderQuestion= new NewOrderQuestion();
        orderQuestion.content="Arrange the following events in chronological order"
        orderQuestion.answers=[
            {content:"Declaration of Independence",order:1},
            {content:"World War II",order:2},
            {content:"First Moon Landing",order:3},
        ]
        newTest.orderQuestions=[orderQuestion];

        let createdTest=await service.addNewTest(newTest);

        expect(createdTest.name).toBe(newTest.name);
        expect(createdTest.choiceQuestions.length).toBe(1);
        expect(createdTest.orderQuestions.length).toBe(1);
        expect(createdTest.textQuestions.length).toBe(1);
    })

    it("Read data from database", async()=>{
        let tests= await service.getAllTests();
        expect(tests.length).toBeGreaterThanOrEqual(1);
        expect(tests[0].textQuestions.length).toBe(1);
        expect(tests[0].orderQuestions.length).toBe(1);
        expect(tests[0].choiceQuestions.length).toBe(1);
    })

})